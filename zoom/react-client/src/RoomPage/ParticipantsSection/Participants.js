import React from "react";
import { connect } from "react-redux";
import { setActiveConversation } from "../../store/actions";

const SingleParticipants = (props) => {
  const {
    identity,
    lastItem,
    participant,
    setActiveConversationAction,
    socketId,
  } = props;

  const handleOpenActiveChatBox = () => {
    console.log(participant);
    console.log(socketId);
    if (participant.socketId !== socketId)
      setActiveConversationAction(participant);
  };
  return (
    <>
      <p className="participants_paragraph" onClick={handleOpenActiveChatBox}>
        {identity}
      </p>
      {!lastItem && <span className="participants_separator_line"> </span>}
    </>
  );
};

const Participants = ({
  participants,
  setActiveConversationAction,
  socketId,
}) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipants
            key={`${participant.identity}-${index}`}
            lastItem={participants.length === index + 1}
            participant={participant}
            identity={participant.identity}
            setActiveConversationAction={setActiveConversationAction}
            socketId={socketId}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return { ...state };
};

const mapActionsToProps = (dispatch) => {
  return {
    setActiveConversationAction: (activeConversation) =>
      dispatch(setActiveConversation(activeConversation)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);
