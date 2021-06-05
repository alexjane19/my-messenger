const router = require("express").Router();
const { User, Conversation } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;
        const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id:  req.user.id,
          user2Id:  req.user.id,
        },
      },
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "user1",
          where: {
            username: {
              [Op.substring]: username,
            },
            id: {
              [Op.not]:  req.user.id,
            },
          },
          attributes: ["id", "username", "photoUrl"],
        },
        {
          model: User,
          as: "user2",
          where: {
            username: {
              [Op.substring]: username,
            },
            id: {
              [Op.not]:  req.user.id,
            },
          },
          attributes: ["id", "username", "photoUrl"],
        },
      ],
    });

    const contacts = [];

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();
      if (convoJSON.user1) {
        contacts[i] = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        contacts[i] = convoJSON.user2;
        delete convoJSON.user2;
      }
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
