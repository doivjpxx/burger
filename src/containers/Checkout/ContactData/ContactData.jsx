import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderform: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          placeholder: "asdasd",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidation(value, rules) {
    let isValid = true;

    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
    }

    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formInput in this.state.orderform) {
      formData[formInput] = this.state.orderform[formInput].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  inputchangedHandler = (event, input) => {
    const updateForm = { ...this.state.orderform };
    const updateElement = { ...updateForm[input] };
    updateElement.value = event.target.value;
    updateElement.valid = this.checkValidation(
      updateElement.value,
      updateElement.validation
    );
    updateElement.touched = true;
    updateForm[input] = updateElement;

    let formIsValid = true;
    for (let input in updateForm) {
      console.log(updateForm[input].valid);
      formIsValid = updateForm[input].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({ orderform: updateForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderform) {
      formElementsArray.push({
        id: key,
        config: this.state.orderform[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(element => {
          return (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              shoulValidation={element.config.validation}
              touched={element.config.touched}
              invalid={!element.config.valid}
              changed={event => this.inputchangedHandler(event, element.id)}
            />
          );
        })}
        <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
