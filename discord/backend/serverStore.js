const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log(connectedUsers);
};

const removeConnectUser = (socketId) => {
  if (connectedUsers.has(socketId)) connectedUsers.delete(socketId);
  console.log("user disconnect");
  console.log(connectedUsers);
};

module.exports = { addNewConnectedUser, removeConnectUser };
