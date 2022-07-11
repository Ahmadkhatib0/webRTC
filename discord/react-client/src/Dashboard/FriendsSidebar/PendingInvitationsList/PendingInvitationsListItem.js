import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import { getActions } from "../../../store/actions/friendsActions";

const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonsDisabled, setButtonDisabled] = useState(false);
  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonDisabled(true);
  };
  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonDisabled(true);
  };

  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "7px",
            display: "flex",
            alignItems: "center",
            justifyCOntent: "space-between",
          }}>
          <Avatar username={username}> </Avatar>
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: "700",
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1">
            {username}{" "}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

const mapStoreActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  null,
  mapStoreActionsToProps
)(PendingInvitationsListItem);
