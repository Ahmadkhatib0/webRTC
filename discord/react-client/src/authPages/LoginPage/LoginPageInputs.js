import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="Email"
        type="text"
        placeholder="enter your email address"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="enter your password"
      />
    </>
  );
};

export default LoginPageInputs;
