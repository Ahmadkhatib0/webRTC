import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseRoomButton = () => {
  const handlerRoomLeave = () => {};

  return (
    <IconButton onClick={handlerRoomLeave} style={{ color: "white" }}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
