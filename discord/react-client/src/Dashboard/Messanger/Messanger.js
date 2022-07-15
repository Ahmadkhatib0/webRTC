import React from "react";
import { connect } from "react-redux";
import { styled } from "@mui/system";
import WelcomeMessage from "./WelcomeMessage";
import MessageContent from "./MessageContent";

const MainContainer = styled("div")({
  display: "flex",
  flexGrow: 1,
  height: "100%",
  marginTop: "49px",
  backgroundColor: "#35393f",
});

const Messenger = ({ chosenChatDetails }) => {
  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessageContent chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

export default connect(mapStoreStateToProps)(Messenger);
