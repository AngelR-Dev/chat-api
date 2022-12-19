const uuid = require("uuid");
const Conversations = require("../models/conversations.models");
const Users = require("../models/users.models");
const Participants = require("../models/participants.models");

const findAllConversations = async () => {
  const data = await Conversations.findAll({
    include: {
      model: Participants,
      include: {
        model: Users,
      },
    },
  });
  return data;
};

const findConversationById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Participants,
        include: {
          model: Users,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      },
    ],
  });
  return data;
};

const updateConversation = async (id, obj) => {
  const data = await Conversations.update({
    where: {
      id,
    },
  });
  return data[0]; //? return array[1] se modifico, [0] no se modifico
};

const removeConversation = async (id) => {
  const data = await Conversations.destroy({
    where: {
      id,
    },
  });
  return data;
};

const createConversation = async (obj) => {
  const data = await Conversations.create({
    id: uuid.v4(),
    title: obj.title,
    imageUrl: obj.imageUrl,
    userId: obj.ownerId, //? id del owner
  });
  const participant1 = await Participants.create({
    id: uuid.v4(),
    userId: obj.ownerId, //? Este es el owner que viene desde el token
    conversationId: data.id,
  });
  const participant2 = await Participants.create({
    id: uuid.v4(),
    userId: obj.participantId, //? Este es el usuario que viene desde body
    conversationId: data.id,
  });
  return { data, participant1, participant2 };
};

module.exports = {
  findAllConversations,
  findConversationById,
  updateConversation,
  removeConversation,
  createConversation,
};
