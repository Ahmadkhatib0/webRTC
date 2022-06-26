import React, { useState } from "react";
import { connect } from "react-redux";
import sendMessageButton from "../../../resources/images/sendMessageButton.svg";
import * as wss from "../../../utilities/wss";

const NewMessage = ({ activeConversation, identity }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    wss.sendDirectMessage({
      receiverSocketId: activeConversation.socketId,
      identity,
      messageContent: message,
    });
    setMessage("");
  };
  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="new_message_container new_message_direct_border">
      <input
        type="text"
        className="new_message_input"
        value={message}
        placeholder="type your message..."
        onChange={handleTextChange}
        onKeyDown={handleKeyPressed}
      />
      <img
        src={sendMessageButton}
        alt="send message"
        onClick={sendMessage}
        className="new_message_button"
      />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStoreStateToProps)(NewMessage);
