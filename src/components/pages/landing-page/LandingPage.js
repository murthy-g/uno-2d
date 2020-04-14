import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <Link to="/login">
      <div className="logo"></div>
    </Link>
  );
};

export default LandingPage;
