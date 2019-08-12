import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('[OrderSummary] will update!');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      key => {
        return (
          <li key={key}><span>{key}: {this.props.ingredients[key]}</span></li>
        )
      }
    );
    return (
      <Aux>
      <h3>Your Order: </h3>
      <ul>
        {ingredientSummary}
      </ul>
      <p>{this.props.price}</p>
      <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinue}>SUBMIT</Button>
    </Aux>
    )
  }
}

export default OrderSummary;
