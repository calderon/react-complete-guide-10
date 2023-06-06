import React, { useReducer, useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    case "BLUR":
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case "BLUR":
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailAction] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPasswordAction] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("USE EFFECT!");
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailAction({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordAction({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({
      type: "BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordAction({
      type: "BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid || emailState.isValid === null
              ? ""
              : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid || passwordState.isValid === null
              ? ""
              : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.state}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
