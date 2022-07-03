import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import AuthBox from "../../shared/components/AuthBox";
import { validateLoginForm } from "../../shared/utilities/validators";
import { getActions } from "../../store/actions/authActions";

const LoginPage = ({ login }) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(
    () => setIsFormValid(validateLoginForm({ mail, password })),
    [mail, password, setIsFormValid]
  );

  const handleLogin = () => login({ mail, password }, history);
  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapStoreActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapStoreActionsToProps)(LoginPage);
