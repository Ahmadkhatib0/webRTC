import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { validateMail } from "../../shared/utilities/validators";

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState("");
  const handleSendInvitation = () => {};
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography> Invite a Friend </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              enter e-mail address of a friend which you would like to invite{" "}
            </Typography>
          </DialogContentText>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="enter email address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
