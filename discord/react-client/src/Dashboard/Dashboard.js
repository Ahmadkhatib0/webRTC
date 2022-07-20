import React, { useEffect } from "react";
import { connect } from "react-redux";
import { styled } from "@mui/system";
import { logout } from "../shared/utilities/auth";
import { getActions } from "../store/actions/authActions";
import { connectionWithSocketServer } from "../realtimeCommunication/socketConnection";
import Sidebar from "./Sidebar/Sidebar";
import FriendsSidebar from "./FriendsSidebar/FriendsSidebar";
import Messenger from "./Messanger/Messanger";
import AppBar from "./AppBar/AppBar";
import Room from "./Room/Room";

const Wrapper = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
});

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  const userDetails = localStorage.getItem("user");
  useEffect(() => {
    if (!userDetails) logout();
    else {
      setUserDetails(JSON.parse(userDetails));
      connectionWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return { ...room };
};

const mapsStoreActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapsStoreActionsToProps)(Dashboard);
