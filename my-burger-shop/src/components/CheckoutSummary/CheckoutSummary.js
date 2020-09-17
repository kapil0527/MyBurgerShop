import React from "react";
import Burger from "../Burger/Burger";
import Button from "../../ui/Button/Button";
import classes from "./CheckoutSummary.module.css";
const checkoutSummary = props => {
  return (
    <div className={classes.checkoutSummary}>
      <h1 style={{ textAlign: "center" }}>
        {"Hope , Buger is Tasty & Healthy"}
      </h1>
      <div
        style={{
          width: "100%x",
          margin: "auto"
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexFlow: "row"
        }}
      >
        <Button btnType="Danger" clicked={props.checkoutCancelHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinueHandler}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
