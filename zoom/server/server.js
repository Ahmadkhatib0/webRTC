const express = require("express");
const http = require("http");
const cors = require("cors");
const twilio = require("twilio");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 5002;
const app = express();
const server = http.createServer(app);
app.use(cors());

let connectedUsers = [];
let rooms = [];

app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id == roomId);

  if (room) {
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else res.send({ roomExists: true, full: false });
  } else return res.send({ roomExists: false });
});

const io = require("socket.io")(server, {
  cors: { origin: "*", method: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });
  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });
  socket.on("disconnect", () => disconnectHandler(socket));
});

const createNewRoomHandler = (data, socket) => {
  const { identity } = data;
  const roomId = uuidv4();
  const newUser = { identity, id: uuidv4(), socketId: socket.id, roomId };
  // push this new connected user to connected users
  connectedUsers = [...connectedUsers, newUser];
  const newRoom = { id: roomId, connectedUsers: [newUser] };
  socket.join(roomId);
  rooms = [...rooms, newRoom];
  // emit to client which created that room emit roomId
  socket.emit("room-id", { roomId });

  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;
  const newUser = { identity, id: uuidv4(), socketId: socket.id, roomId };
  const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

  socket.join(roomId);
  connectedUsers = [...connectedUsers, newUser];
  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    //remove this user from the room ;
    const room = rooms.find((room) => room.id === user.roomId);
    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    ); //reassign connectedUsers, by filter out the user that want to disconnect

    //  close the room if count users in room reach zero
    socket.leave(user.roomId);
    if (room.connectedUsers.length > 0) {
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    } else rooms = room.filter((r) => r.id !== room.id);
  }
};

server.listen(PORT, () => console.log(`server listening on prot ${PORT}`));
