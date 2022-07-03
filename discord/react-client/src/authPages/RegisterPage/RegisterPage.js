import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getActions } from "../../store/actions/authActions";
import { validateRegisterForm } from "../../shared/utilities/validators";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";

const RegisterPage = ({ register }) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(
    () => setIsFormValid(validateRegisterForm({ mail, password, username })),
    [mail, username, password, setIsFormValid]
  );

  const handleRegister = () => register({ mail, username, password }, history);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white" }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapStoreActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapStoreActionsToProps)(RegisterPage);
