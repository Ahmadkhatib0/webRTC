const connectedUsers = new Map();
let io = null;

const setServerSocketInstance = (ioInstance) => (io = ioInstance);
const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log(connectedUsers);
};

const removeConnectUser = (socketId) => {
  if (connectedUsers.has(socketId)) connectedUsers.delete(socketId);
};

const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) activeConnections.push(key);
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });
  return onlineUsers;
};

module.exports = {
  addNewConnectedUser,
  removeConnectUser,
  getActiveConnections,
  getSocketServerInstance,
  setServerSocketInstance,
  getOnlineUsers,
};
