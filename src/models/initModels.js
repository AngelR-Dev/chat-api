const Users = require("./users.models");
const Messages = require("./messages.models");
const Participants = require("./participants.models");
const Conversations = require("./conversations.models");

const initModels = () => {
  //* FK -> belongs

  //? Users -> Messages
  Users.hasMany(Messages)
  Messages.belongsTo(Users)

  //? Users -> Conversations
  Users.hasMany(Conversations)
  Conversations.belongsTo(Users)

  //? Users -> Participants tabla pivote entre users - conversations
  Users.hasMany(Participants)
  Participants.belongsTo(Users)

  //? Conversations -> Messages
  Conversations.hasMany(Messages),
  Messages.belongsTo(Conversations)

  //? Conversations -> Participants tabla pivote entre users - conversations
  Conversations.hasMany(Participants)
  Participants.belongsTo(Conversations)
};

module.exports = initModels;
