import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  addMessagesToStore,
  addUserIsTypingToStore,
  removeUserIsTypingToStore,
  addUnreadMessagesToStore,
  addLastSeenMessageToStore,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const SET_MESSAGES = "SET_MESSAGES";
const ADD_USER_IS_TYPING = "ADD_USER_IS_TYPING";
const REMOVE_USER_IS_TYPING = "REMOVE_USER_IS_TYPING";
const ADD_UNREAD_MESSAGES = "ADD_UNREAD_MESSAGES";
const ADD_LAST_SEEN_MESSAGE = "ADD_LAST_SEEN_MESSAGE";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const setOldMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: { messages },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

export const addUserIsTyping = (id) => {
  return {
    type: ADD_USER_IS_TYPING,
    id,
  };
};

export const removeUserIsTyping = (id) => {
  return {
    type: REMOVE_USER_IS_TYPING,
    id,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};


export const addUnreadMessages = (conversationId, unreadMessages) => {
  return {
    type: ADD_UNREAD_MESSAGES,
    payload: { conversationId, unreadMessages },
  };
};

export const addLastSeenMessage = (conversationId, messageId) => {
  return {
    type: ADD_LAST_SEEN_MESSAGE,
    payload: { conversationId, messageId },
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage

      );
    case ADD_UNREAD_MESSAGES:
      return addUnreadMessagesToStore(
          state,
          action.payload.conversationId,
          action.payload.unreadMessages
      );
    case ADD_LAST_SEEN_MESSAGE:
      return addLastSeenMessageToStore(
          state,
          action.payload.conversationId,
          action.payload.messageId
      );
    case SET_MESSAGES:
      return addMessagesToStore(state, action.payload);
    case ADD_USER_IS_TYPING: {
      return addUserIsTypingToStore(state, action.id);
    }
    case REMOVE_USER_IS_TYPING: {
      return removeUserIsTypingToStore(state, action.id);
    }
    default:
      return state;
  }
};

export default reducer;
