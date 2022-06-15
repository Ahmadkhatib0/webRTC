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
