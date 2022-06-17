import Peer from "simple-peer";
import store from "../store/store";
import { setShowOverlay } from "../store/actions";
import * as wss from "./wss";
const defaultConstraints = { audio: true, video: true };

let localStream;
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfully received local stream ");
      localStream = stream;
      showLocalVideoPreview(localStream);
      store.dispatch(setShowOverlay(false));
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((error) => {
      console.log("an error occurred when trying to get local stream");
      console.log(error);
    });
};

const showLocalVideoPreview = (stream) => {};

let peers = {};
let streams = [];
const getConfiguration = () => {
  // stun allow us to get info about our internet connection
  return { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // on signal we've: webRTC offer, webRTC answer, (sdp information), ice candidates
    const signalData = { signal: data, connUserSocketId: connUserSocketId };
    wss.signalPeerData(signalData);
  });
  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal);
};

const addStream = (stream, connUserSocketId) => {};
