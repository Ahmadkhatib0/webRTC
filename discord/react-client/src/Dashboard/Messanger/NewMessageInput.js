import React, { useState } from "react";
import { connect } from "react-redux";
import { styled } from "@mui/system";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  background: "#2f3136",
  width: "98%",
  height: "46px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("");
  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") handleSendMessage();
  };
  const handleSendMessage = () => {
    console.log("sent");
    if (message.length > 0) {
      sendDirectMessage({ receiverUserId: chosenChatDetails.id, content: message });
    }
    setMessage("");
  };
  return (
    <MainContainer>
      <Input
        placeholder={`write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};
export default connect(mapStoreStateToProps)(NewMessageInput);
