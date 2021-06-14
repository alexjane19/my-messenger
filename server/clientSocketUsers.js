const { Conversation } = require("./db/models");
const ClientSocketUsers = {};

ClientSocketUsers.getUserContacts = async function (userId) {
  return await Conversation.fetchUserContacts(userId);
};

module.exports = ClientSocketUsers;
