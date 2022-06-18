import React, { useState } from "react";
import shareScreen from "../../resources/images/switchToScreenSharing.svg";
import LocaleScreenSharingPreview from "./LocaleScreenSharingPreview";
import * as webRTCHandler from "../../utilities/webRTCHandler";

const constraints = { audio: false, video: true };
const SwitchToScreenSharingButton = (props) => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const handleScreenSharing = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch {
        console.log("failed to get screen share stream");
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // execute here function to switch the video track which we're sending to other users
      }
    } else {
      // switch for video track for camera
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);
      // stop screen sharing stream ;
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };
  return (
    <>
      <div className="video_button_container">
        <img
          src={shareScreen}
          onClick={handleScreenSharing}
          className="video_button_image"
          alt="share screen"
        />
      </div>
      {isScreenSharingActive && (
        <LocaleScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
