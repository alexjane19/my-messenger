import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Header, Input, Messages } from "./index";
import { connect } from "react-redux";
import { fetchMessages } from "../../store/utils/thunkCreators";
import { readMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const readMessage = async (message) => {
    if (
      conversation.unread?.messages?.length > 0 &&
      conversation.unread?.messages.includes(message.id)
    ) {
      let index = conversation.unread?.messages.indexOf(message.id);
      conversation.unread?.messages.splice(index, 1);
      await props.readMessages(user.id, message, conversation.unread);
    }
  };
  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              conversationId={conversation.id}
              fetchMessages={props.fetchMessages}
              total={conversation.total}
              unread={conversation.unread}
              readMessage={readMessage}
              lastSeenMessage={conversation.lastSeenMessage}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (body) => {
      dispatch(fetchMessages(body));
    },
    readMessages: (userId, message, newUnreadMessages) => {
      dispatch(readMessages(userId, message, newUnreadMessages));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
