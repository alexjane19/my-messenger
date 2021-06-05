const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.isOwnedConversation = async function (conversationId, userId) {
  return await Conversation.findOne({
    where: {
      id: {
        [Op.eq]: conversationId
      },
      [Op.or]: {
        user1Id:  userId,
        user2Id:  userId,
      },

    }
  });
};

Conversation.fetchUserContacts = async function (userId) {
  const contacts = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attributes: ["id"],
    include: [
      {
        model: User,
        as: "user1",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "email", "photoUrl"],
        required: false,
      },
      {
        model: User,
        as: "user2",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "email", "photoUrl"],
        required: false,

      },
    ],
  });
  const conversations = [];
  for (let i = 0; i < contacts.length; i++) {
    const convo = contacts[i];
    if (convo.user1) {
      contacts[i] = convo.user1;
      delete convo.user1;
    } else if (convo.user2) {
      contacts[i] = convo.user2;
      delete convo.user2;
    }
    conversations[i] = convo.id
  }
  return {
    contacts: contacts,
    conversations: conversations,
  };
};

module.exports = Conversation;
