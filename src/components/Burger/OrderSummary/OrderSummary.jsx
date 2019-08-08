import React from "react";
import Aux from "../../../hoc/Aux";

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
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
        provident cupiditate veniam excepturi voluptas sint nobis esse id minus
        nesciunt debitis corrupti quae nostrum dolorum rem quidem, facilis
        libero voluptatum.
      </p>
      <ul>
        {ingredientSummary}
      </ul>
    </Aux>
  );
};

export default orderSummary;
