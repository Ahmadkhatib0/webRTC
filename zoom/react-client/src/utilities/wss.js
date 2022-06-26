import io from "socket.io-client";
import store from "../store/store";
import { setParticipants, setRoomId, setSocketId } from "../store/actions";
import * as webRTCHandler from "./webRTCHandler";
const SERVER = "http://localhost:5002";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);
  socket.on("connect", () => {
    console.log(socket.id);
    store.dispatch(setSocketId(socket.id));
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    //inform the user which just joined the room that we've prepared for incoming connection
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) =>
    webRTCHandler.removePeerConnection(data)
  );

  socket.on("direct-message", (data) => console.log(data));
};

export const createNewRoom = (identity, onlyAudio) => {
  const data = { identity, onlyAudio };
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio) => {
  const data = { identity, roomId, onlyAudio };
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};
