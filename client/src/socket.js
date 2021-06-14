import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  addUnreadMessages,
  addLastSeenMessage,
  addUserIsTyping,
  removeUserIsTyping,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("typing", (data) => {
    if (data.status) store.dispatch(addUserIsTyping(data.sender));
    else store.dispatch(removeUserIsTyping(data.sender));
  });
  socket.on("unread", (data) => {
    Object.keys(data["conversations"]).map(k => store.dispatch(addUnreadMessages(k, {
      recipientId: data["recipientId"],
      messages: data["conversations"][k],
    })));
  });

  socket.on("seen", (data) => {
    store.dispatch(addLastSeenMessage(data.conversationId, data.messageId));
  });
});

export default socket;
