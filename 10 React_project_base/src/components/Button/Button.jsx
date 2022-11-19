import React from "react";
import './Button.scss';

const Button = (props) => {
  return <button {...props}>{props.title}</button>;
};

export default Button;
