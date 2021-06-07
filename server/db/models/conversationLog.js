const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");

const ConversationLog = db.define("conversation_log", {
  unreadMessages: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)    ,
    allowNull: true,
  },
  lastSeenMessage: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
});


ConversationLog.findUnreadMessagesByConversation = async function (userId, conversationId) {
  const query = await ConversationLog.findOne({
    where: {
      conversationId: {
        [Op.eq]:  conversationId,
      },
      userId: {
        [Op.eq]:  userId,
      },
    },
    attributes: ["unreadMessages"],
  });
  if (query)
    return query.unreadMessages;
  return [];
};


ConversationLog.findUnreadMessages = async function (userId) {
  const query = await ConversationLog.findAll({
    where: {
      userId: {
        [Op.eq]:  userId,
      },
    },
    attributes: ["conversationId", "unreadMessages", "lastSeenMessage"],
  });
  return query;
};

ConversationLog.findConversationLog = async function (userId, conversationId) {
  const query = await ConversationLog.findOne({
    where: {
      conversationId: {
        [Op.eq]:  conversationId,
      },
      userId: {
        [Op.eq]:  userId,
      },
    },
    attributes: ["unreadMessages", "lastSeenMessage"],
  });

  if (query)
    return {
      unreadMessages: query.unreadMessages,
      lastSeenMessage: query.lastSeenMessage
    };
  return {
    unreadMessages: [],
    lastSeenMessage: 0
  };
};

ConversationLog.findLastSeenMessage = async function (userId, conversationId) {
  const query = await ConversationLog.findOne({
    where: {
      conversationId: {
        [Op.eq]:  conversationId,
      },
      userId: {
        [Op.eq]:  userId,
      },
    },
    attributes: ["lastSeenMessage"],
  });

  if (query)
    return query.lastSeenMessage;
  return 0;
};

module.exports = ConversationLog;
