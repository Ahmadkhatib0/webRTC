import React, { useState } from "react";
import shareScreen from "../../resources/images/switchToScreenSharing.svg";
const SwitchToScreenSharingButton = (props) => {
  const [isScreenShare, setIsScreenShare] = useState(false);
  const handleScreenSharing = () => {
    setIsScreenShare(!isScreenShare);
  };
  return (
    <div className="video_button_container">
      <img
        src={shareScreen}
        onClick={handleScreenSharing}
        className="video_button_image"
        alt="share screen"
      />
    </div>
  );
};

export default SwitchToScreenSharingButton;
