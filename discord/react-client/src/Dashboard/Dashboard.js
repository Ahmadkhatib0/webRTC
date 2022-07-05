import React from "react";
import { styled } from "@mui/system";
import Sidebar from "./Sidebar/Sidebar";
import FriendsSidebar from "./FriendsSidebar/FriendsSidebar";
import Messenger from "./Messanger/Messanger";
import AppBar from "./AppBar/AppBar";

const Wrapper = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
});

const Dashboard = () => {
  return (
    <Wrapper>
      <Sidebar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
