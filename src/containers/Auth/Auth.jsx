import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
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

  inputchangedHandler = (event, input) => {
    const updatedControls = {
      ...this.state.controls,
      [input]: {
        ...this.state.controls[input],
        value: event.target.value,
        valid: this.checkValidation(event.target.value, this.state.controls[input].validation),
        touched: true,
      }
    }
    this.setState({controls: updatedControls});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    return (
      <div className={classes.Auth}>
        <form>
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
        <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}

export default Auth;