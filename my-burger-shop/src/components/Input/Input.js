import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let input = null;

  switch (props.elementConfig.elementType) {
    case "input":
      input = (
        <input
          placeholder={props.elementConfig.placeholder}
          value={props.value}
          onChange={props.changeHandler}
          style={{
            outlineColor: "none",
            backgroundcolor: "lightgrey",
            alignItems: "center",
            width: "100%"
          }}
        />
      );
      break;
    default:
  }
  return <div className={classes.Input}>{input}</div>;
};

export default input;
