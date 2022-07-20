import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

const MicButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const handleScreenShareToggle = () => setIsScreenSharingActive(!isScreenSharingActive);

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  );
};

export default MicButton;
