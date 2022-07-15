import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
  height: "48px",
  borderBottom: "solid 1px black",
  background: "#35393f",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});
const AppBar = () => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
