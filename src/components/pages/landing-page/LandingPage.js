import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <h1>This will be a fancy landing page</h1>
      <Link to="/login">LOGIN!</Link>
    </div>
  );
};

export default LandingPage;
