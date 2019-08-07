import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformIngredients = Object.keys(props.ingredients).map(key => {
    return [...Array(props.ingredients[key])].map((_, i) => {
      return <BurgerIngredient key={key + i} type={key} />;
    })
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  });

  console.log(transformIngredients);

  if (transformIngredients.length === 0) {
    console.log(true);
    transformIngredients = <p>Please start adding...</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
