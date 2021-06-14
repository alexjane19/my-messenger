const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationLog = require("./conversationLog");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
User.belongsToMany(Conversation, { through: ConversationLog });
Conversation.belongsToMany(User, { through: ConversationLog });

module.exports = {
  User,
  Conversation,
  Message,
  ConversationLog
};
