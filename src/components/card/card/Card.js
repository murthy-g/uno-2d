import React from "react";
import "./Card.scss";

const Card = ({ x, y }) => (
  <div
    className="sprite"
    style={{
      backgroundPosition: `-${x}px -${y}px`
    }}
  />
);

export default Card;
