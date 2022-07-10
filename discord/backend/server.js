const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socketServer = require("./socket");
const authRoutes = require("./routes/auth");
const friendInvitationsRoutes = require("./routes/friendInvitationsRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationsRoutes);
const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () =>
      console.log(`server is listening on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
