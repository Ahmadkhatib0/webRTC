import React from "react";
import ParticipantsLabel from "./ParticipantsLabel";
import Participants from "./Participants";
import DirectChat from "./DirectChat/DirectChat";

const ParticipantsSection = (props) => {
  return (
    <div className="participants_section_container">
      <Participants />
      <ParticipantsLabel />
      <DirectChat />
    </div>
  );
};

export default ParticipantsSection;
