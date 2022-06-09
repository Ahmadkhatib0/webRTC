import React from "react";
import logo from "../resources/images/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import "./introductionPage.css";

const introductionPage = (props) => {
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} alt="" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default introductionPage;
