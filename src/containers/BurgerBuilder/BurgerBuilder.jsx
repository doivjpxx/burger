import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: null
  };  

  componentDidMount() {
    axios.get('https://react-burger-f2801.firebaseio.com/ingredients.json')
         .then(res => {
           this.setState({ ingredients: res.data });
         })
         .catch(err => {
           this.setState({ error: true });
         });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState(updateIngredients) {
    const ingredients = updateIngredients;

    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    // console.log(updateIngredients);
    updateIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    // console.log(updateIngredients);
    updateIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('Yes!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Huy Phong",
        address: {
          street: "595 cmt8",
          zipCode: "70000",
          country: "VietNam"
        },
        email: "huyphong@gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(e => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    // console.log(disabledInfo);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
            disabledControl={disabledInfo}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
