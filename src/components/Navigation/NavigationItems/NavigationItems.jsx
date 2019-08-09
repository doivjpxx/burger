import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Link 1</NavigationItem>
    <NavigationItem link="/">Link 1</NavigationItem>
  </ul>
);

export default navigationItems;
