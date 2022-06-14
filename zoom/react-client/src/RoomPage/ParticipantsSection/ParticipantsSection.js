import React from "react";
import ParticipantsLabel from "./ParticipantsLabel";
import Participants from "./Participants";

const ParticipantsSection = (props) => {
  return (
    <div className="participants_section_container">
      <Participants />
      <ParticipantsLabel />
    </div>
  );
};

export default ParticipantsSection;
