import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const ChosenOptionLabel = ({ name }) => {
  return (
    <Typography sx={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
      {`${name ? `chosen conversation ${name}` : ""}`}
    </Typography>
  );
};

const mapStoreStateToProps = (state) => {
  return { name: state.chat.chosenChatDetails?.name };
};

export default connect(mapStoreStateToProps)(ChosenOptionLabel);
