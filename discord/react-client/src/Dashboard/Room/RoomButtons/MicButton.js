import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicIconOff from "@mui/icons-material/MicOff";

const MicButton = () => {
  const [micEnabled, setIsMicEnabled] = useState(true);
  const handleToggleMic = () => setIsMicEnabled(!micEnabled);

  return (
    <IconButton onClick={handleToggleMic} style={{ color: "white" }}>
      {micEnabled ? <MicIcon /> : <MicIconOff />}
    </IconButton>
  );
};

export default MicButton;
