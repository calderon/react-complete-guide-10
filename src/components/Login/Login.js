import React, { useReducer, useState, useEffect, useContext } from "react";

import AuthContext from "../../context/auth.js";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input.js";

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
  const authContext = useContext(AuthContext);
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

    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-mail"
          id="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={emailState.isValid}
        />
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
