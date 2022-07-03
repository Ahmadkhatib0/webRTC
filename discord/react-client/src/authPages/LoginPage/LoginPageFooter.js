import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "your should enter correct email address , and password should be between 6 and 12 characters";
};
const getFormValidMessage = () => "press to login";

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useHistory();
  const handlePushToRegisterPage = () => {
    history.push("/register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
        <div>
          <CustomPrimaryButton
            label="login"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="need an account? "
        redirectText="create an account "
        redirectHandler={handlePushToRegisterPage}
        additionalStyles={{ marginTop: "5px" }}
      />
    </>
  );
};

export default LoginPageFooter;
