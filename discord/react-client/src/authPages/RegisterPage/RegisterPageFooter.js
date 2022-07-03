import { Tooltip } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";

const getFormNotValidMessage = () =>
  "username should be between 3 and 12 characters, password should be between 6 and 12 characters, you should also provide a valid email address";
const getFormValidMessage = () => "press to register";

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const history = useHistory();
  const handlePushToLoginPage = () => {
    history.push("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account? "
        redirectHandler={handlePushToLoginPage}
        additionalStyles={{ marginTop: "5px" }}
      />
    </>
  );
};

export default RegisterPageFooter;
