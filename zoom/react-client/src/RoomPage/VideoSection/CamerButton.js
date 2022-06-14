import React, { useState } from "react";
import cameraOn from "../../resources/images/camera.svg";
import cameraOff from "../../resources/images/cameraOff.svg";

const CameraButton = (props) => {
  const [isCamera, setIsCamera] = useState(false);
  const handleCameraButtonPressed = () => {
    setIsCamera(!isCamera);
  };
  return (
    <div className="video_button_container">
      <img
        src={isCamera ? cameraOff : cameraOn}
        onClick={handleCameraButtonPressed}
        className="video_button_image"
        alt="camera"
      />
    </div>
  );
};

export default CameraButton;
