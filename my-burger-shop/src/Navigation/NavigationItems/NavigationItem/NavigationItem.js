import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItems = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.path}
        activeClassName={classes.active}
        exact={props.exact}
      >
        {" "}
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItems;
