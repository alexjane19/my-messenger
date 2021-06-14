import React, { Component } from "react";
import { Box, withStyles } from "@material-ui/core";
import { OtherUserBubble, SenderBubble, IsTypingView } from "../ActiveChat";
import moment from "moment";
import { InView } from "react-intersection-observer";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column-reverse",
  },

  progressBarContainer: {
    textAlign: "center",
  },
};

class Messages extends Component {
  constructor(props) {
    super(props);
    this.page = {};
  }
  loading = async (inView) => {
    if (this.page[this.props.conversationId] === undefined) {
      this.page[this.props.conversationId] = 0;
    }

    if (inView) {
      const reqBody = {
        conversationId: this.props.conversationId,
        page: ++this.page[this.props.conversationId],
      };
      await this.props.fetchMessages(reqBody);
    }
  };
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  render() {
    const { classes } = this.props;
    const { messages, otherUser, userId, total, conversationId } = this.props;
    return (
      <Box className={classes.root}>
        {otherUser.typing && <IsTypingView otherUser={otherUser} />}
        <Box
          ref={(el) => {
            this.messagesEnd = el;
          }}
        />
        {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} time={time} />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
        {total > messages.length && (
          <InView
            key={"loading" + conversationId}
            onChange={(inView, entry) => this.loading(inView)}
            threshold={0.3}
            className={classes.progressBarContainer}
          >
            <CircularProgress key={"circular" + conversationId} />
          </InView>
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(Messages);
