import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    key => {
      return (
        <li key={key}><span>{key}: {props.ingredients[key]}</span></li>
      )
    }
  );
  console.log(ingredientSummary);
  return (
    <Aux>
      <h3>Your Order: </h3>
      <ul>
        {ingredientSummary}
      </ul>
      <p>{props.price}</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>SUBMIT</Button>
    </Aux>
  );
};

export default orderSummary;
