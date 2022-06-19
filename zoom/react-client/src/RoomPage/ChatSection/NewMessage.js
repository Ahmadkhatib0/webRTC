import React, { useState } from "react";
import sendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utilities/webRTCHandler";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };

  return (
    <div className="new_message_container">
      <input
        type="text"
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="type your message..."
        onKeyDown={handleKeyPressed}
      />
      <img
        src={sendMessageButton}
        className="new_message_button"
        onClick={sendMessage}
        alt="send message"
      />
    </div>
  );
};

export default NewMessage;
