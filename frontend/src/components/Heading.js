import React from "react";
import "../styles/heading.css";

const Heading = ({ title }) => {
  return (
    <center className="heading">
      <h1>{title}</h1>
    </center>
  );
};

export default Heading;
