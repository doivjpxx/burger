import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(e => {
        this.setState({ loading: false});
      });
  }

  render() {
    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name..." />
          <input className={classes.Input} type="text" name="email" placeholder="Your email..." />
          <input className={classes.Input} type="text" name="street" placeholder="Your street..." />
          <input className={classes.Input} type="text" name="postalCode" placeholder="Your postalCode..." />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;