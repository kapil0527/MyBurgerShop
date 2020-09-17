import React from "react";
import classes from "./Order.module.css";

const order = props => {
  let ingredients = [];
  for (let ingredient in props.ingredients) {
    ingredients.push({ key: ingredient, value: props.ingredients[ingredient] });
  }
  console.log(ingredients);
  const ingredientElements = ingredients.map(ing => {
    return (
      <span
        style={{
          margin: "5px",
          boxSizing: "border",
          border: "1px solid black",
          width: "100%",
          padding: "0px 5px",
          textAlign: "center"
        }}
        key={ing.key}
      >
        {ing.key} ({ing.value})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredient: {ingredientElements}</p>
      <p>
        Price: <strong>USD {props.price} </strong>
      </p>
    </div>
  );
};

export default order;
