const express = require("express");
require("dotenv").config();
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

app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const client = twilio(accountSid, authToken);
  try {
    client.tokens.create().then((token) => {
      res.send({ token });
    });
  } catch (error) {
    console.log("error occurred when fetching turn server credentials");
    console.log(error);
    res.send({ token: null });
  }
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

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => initializeConnectionHandler(data, socket));
  socket.on("direct-message", (data) => directMessageHandler(data, socket));
});

const createNewRoomHandler = (data, socket) => {
  const { identity, onlyAudio } = data;
  const roomId = uuidv4();
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
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
  const { identity, roomId, onlyAudio } = data;
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
  const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

  socket.join(roomId);
  connectedUsers = [...connectedUsers, newUser];

  //emit to all users which are in this room to prepare peer connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = { connUserSocketId: socket.id };
      io.to(user.socketId).emit("conn-prepare", data);
    }
  });
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
      // emit to all users which are still in the room that user disconnected
      io.to(room.id).emit("user-disconnected", { socketId: socket.id });

      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    } else rooms = rooms.filter((r) => r.id !== room.id);
  }
};

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;
  const signalingData = { signal, connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-signal", signalingData);
};

// information from clients which are already in room that they've prepared for incoming connection
const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-init", initData);
};

const directMessageHandler = (data, socket) => {
  if (
    connectedUsers.find(
      (connectedUser) => connectedUser.socketId === data.receiverSocketId
    )
  ) {
    const receiverData = {
      authorSocketId: socket.id,
      messageContent: data.messageContent,
      isAuthor: false,
      identity: data.identity,
    };
    socket.to(data.receiverSocketId).emit("direct-message", receiverData);

    const authorData = {
      receiverSocketId: data.receiverSocketId,
      messageContent: data.messageContent,
      isAuthor: true,
      identity: data.identity,
    };
    socket.emit("direct-message", authorData);
  }
};

server.listen(PORT, () => console.log(`server listening on prot ${PORT}`));
