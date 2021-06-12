import React from "react";
import { Box, GridList } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, IsTypingView } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  return (
    <GridList cellHeight="100%" cols={1}>
      <Box>
        {messages
          .slice()
          .reverse()
          .map((message) => {
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
      </Box>
      {otherUser.typing && <IsTypingView otherUser={otherUser} />}
    </GridList>
  );
};

export default Messages;
