const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      let isOwnedConversation = await Conversation.isOwnedConversation(
          conversationId,
          senderId,
      );
      // if the conversation is owned by user, message can be sent.
      if (isOwnedConversation) {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      }else{
        return res
            .status(404)
            .json({ error: "The conversation is not found!" });
      }
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
        senderId,
        recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.post("/history", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const { conversationId, page } = req.body;
    if (conversationId) {
      let conversation = await Conversation.isOwnedConversation(
          conversationId,
          userId,
      );
      if(!conversation){
        return res
            .status(404)
            .json({ error: "The conversation is not found!" });
      }
      const messages = await conversation.getMessages({ limit: Message.LIMIT_PAGE, offset: page*Message.LIMIT_PAGE,order: [["createdAt", "DESC"]] });
      if (!messages || messages.length === 0) {
        return res
            .status(404)
            .json({ error: "No messages!" });
      }
      return res.json(messages);
    }else {
      return res
          .status(400)
          .json({ error: "conversationId is required!" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
