import React from "react";
import FiberManuelRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";

const OnlineIndicator = () => {
  return (
    <Box
      sx={{
        color: "#3ba55d",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: "5px",
      }}>
      {" "}
      <FiberManuelRecordIcon />{" "}
    </Box>
  );
};

export default OnlineIndicator;
