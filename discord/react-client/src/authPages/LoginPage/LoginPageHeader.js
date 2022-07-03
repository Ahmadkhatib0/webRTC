import React from "react";
import { Typography } from "@mui/material";

const LoginPageHeader = () => {
  return (
    <>
      <Typography variants="h4" sx={{ color: "white" }}>
        Welcome back!
      </Typography>
      <Typography variants="" sx={{ color: "#b9bbbe" }}>
        we are happy that you are here
      </Typography>
    </>
  );
};

export default LoginPageHeader;
