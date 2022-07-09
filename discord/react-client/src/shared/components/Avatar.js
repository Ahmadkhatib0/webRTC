import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "43px",
  background: "#5865f2",
  borderRadius: "42px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  fontSize: "20px",
  marginLeft: "5px",
  fontWeight: "700",
  color: "white",
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
