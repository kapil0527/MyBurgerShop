import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { Link } from "react-router-dom";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem path="/" exact>
        {" "}
        Burger Builder
      </NavigationItem>

      <NavigationItem path="/orders"> My Orders</NavigationItem>
    </ul>
  );
};

export default navigationItems;
