import React from "react";
import { connect } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { getActions } from "../../store/actions/alertActions";

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}>
      <Alert severity="info"> {alertMessageContent} </Alert>
    </Snackbar>
  );
};

const mapStoreStateToProps = ({ alert }) => {
  return { ...alert };
};

const mapStoreActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToProps,
  mapStoreActionsToProps
)(AlertNotification);
