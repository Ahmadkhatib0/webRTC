import React from "react";
import { useHistory } from "react-router-dom";
import ConnectingButton from "./ConnectingButton";
const ConnectingButtons = () => {
  let history = useHistory();
  const pushToJoinRoomPage = () => {
    history.push("/join-room");
    history.go(0);
  };
  const pushToJoinRoomPageAsAHost = () => {
    history.push("/join-room?host=true");
    history.go(0);
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        createRoomButton
        buttonText="host a meeting"
        onClickHandler={pushToJoinRoomPageAsAHost}
      />
    </div>
  );
};

export default ConnectingButtons;
