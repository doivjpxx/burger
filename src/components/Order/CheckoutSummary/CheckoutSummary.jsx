import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope you like it!</h1>
      <div style={{
        width: '300px',
        height: '300px'
      }}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
    </div>
  )
}

export default checkoutSummary;