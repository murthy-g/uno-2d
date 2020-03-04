import React from "react";
import "./CardContainer.scss";

const CardContainer = ({ innerRef, children, ...props }) => {
  return (
    <div ref={innerRef} className="card-container" {...props}>
      {children}
    </div>
  );
};

export default CardContainer;
