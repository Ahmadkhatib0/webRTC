import React, { useState, useEffect } from "react";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import AuthBox from "../../shared/components/AuthBox";
import { validateLoginForm } from "../../shared/utilities/validators";

const LoginPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(
    () => setIsFormValid(validateLoginForm({ mail, password })),
    [mail, password, setIsFormValid]
  );

  const handleLogin = () => {
    console.log("login");
  };
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

export default LoginPage;
