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

server.listen(PORT, () => console.log(`server listening on prot ${PORT}`));
