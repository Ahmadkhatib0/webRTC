import React, { useState } from "react";
import { IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";

const CameraButton = () => {
  const [cameraEnabled, setIsCameraEnabled] = useState(true);
  const handleToggleCamera = () => setIsCameraEnabled(!cameraEnabled);

  return (
    <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
      {cameraEnabled ? <VideocamIcon /> : <VideocamOff />}
    </IconButton>
  );
};

export default CameraButton;
