import React, { useState } from "react";
import sendMessageButton from "../../../resources/images/sendMessageButton.svg";

const NewMessage = ({ activeConversation, identity }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    //
  };
  const handleTextChange = (event) => {
    sendMessage(event.target.value);
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

export default NewMessage;
