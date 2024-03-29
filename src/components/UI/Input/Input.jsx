import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;

  const inputClasses = [classes.inputElement];

  if (props.invalid && props.shoulValidation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          defaultValue={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          defaultValue={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      console.log("aasd");
      inputElement = (
        <input
          className={classes.inputElement}
          {...props.elementConfig}
          defaultValue={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor={props.label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
