export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.total += 1;
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.unshift(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.total += 1;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.unshift(message);
      newConvo.latestMessageText = message.text;
      newConvo.total += 1;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addMessagesToStore = (state, payload) => {
  const { messages } = payload;
  return state.map((convo) => {
    if (convo.id === messages[0].conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(...messages);
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addUserIsTypingToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.typing = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeUserIsTypingToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.typing = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addUnreadMessagesToStore = (
  state,
  conversationId,
  unreadMessages
) => {
  return state.map((convo) => {
    if (convo.id.toString() === conversationId.toString()) {
      const convoCopy = { ...convo };
      convoCopy.unread = unreadMessages;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addLastSeenMessageToStore = (state, conversationId, messageId) => {
  return state.map((convo) => {
    if (convo.id.toString() === conversationId.toString()) {
      const convoCopy = { ...convo };
      convoCopy.lastSeenMessage = messageId;
      return convoCopy;
    } else {
      return convo;
    }
  });
};
