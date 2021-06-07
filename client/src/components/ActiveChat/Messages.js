import React from "react";
import {Avatar, Box, makeStyles} from "@material-ui/core";
import {OtherUserBubble, SenderBubble} from "../ActiveChat";
import moment from "moment";
import {InView} from 'react-intersection-observer';

const useStyles = makeStyles(() => ({
    avatar: {
        height: 20,
        width: 20,
        marginTop: 6,
        marginLeft: 'auto',
    },
}));

const Messages = (props) => {
    const classes = useStyles();
    const { messages, otherUser, userId, readMessage, lastSeenMessage} = props;
    const viewObserve = async (message, entry) => {
        readMessage(message)
    };

    return (
        <Box>
            {messages.slice().reverse().map((message) => {
                const time = moment(message.createdAt).format("h:mm");
                return <Box key={'box'+message.id}>  {message.senderId === userId ?
                    <SenderBubble  key={message.id} text={message.text} time={time}/>
                    :
                    <InView key={'iv'+message.id} onChange={(inView, entry) => viewObserve(message, entry)}>
                        <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
                    </InView>
                }
                    {message.id === lastSeenMessage ?<Avatar key={'av'+message.id} alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}/>: null}
                </Box>;
            })}
        </Box>
    );
};

export default Messages;
