import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer>
      <Avatar large username={name} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginLeft: "6px",
          marginRight: "6px",
        }}>
        {" "}
        {name}{" "}
      </Typography>
      <Typography sx={{ color: "#b9bbe0", marginLeft: "5px", marginRight: "5px" }}>
        This is the begging of the conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
