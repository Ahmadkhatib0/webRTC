import React, { useState } from "react";
import micOn from "../../resources/images/mic.svg";
import micOff from "../../resources/images/micOff.svg";

const MicButton = (props) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const handleMicButtonPrassed = () => {
    setIsMicMuted(!isMicMuted);
  };
  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? micOff : micOn}
        alt="mic"
        onClick={handleMicButtonPrassed}
        className="video_button_image"
      />
    </div>
  );
};

export default MicButton;
