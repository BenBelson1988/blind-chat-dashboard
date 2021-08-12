import authSlicer, {
  fetchUserDetailsAction,
  signInAction,
  signUpAction,
} from "../../../stores/slices/authSlicer";
import { Auth } from "aws-amplify";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import logo from "../../../logo.svg";
import "./UI/LoginSignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { propStyle } from "aws-amplify-react";
import Loader from "./common/Loader";

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then((user) => console.log({ user }))
    .catch((err) => console.log(err));
}

function signOut() {
  Auth.signOut()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

export default () => {
  const [enteredEmail, setEnteredEmial] = useState("");
  const [enterEmailisValid, setEnterEmailisValid] = useState(false);
  const [enteredPass, setEnteredPass] = useState("");
  const [enterPassisValid, setEnterPassisValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let errmsg = null;
  let signupmsg = null;

  const formSubmissionHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (enterPassisValid && enterEmailisValid) setFormIsValid(true);
    else setFormIsValid(false);
  }, [enterPassisValid, enterEmailisValid]);

  const emailInputHandler = (event) => {
    setEnteredEmial(event.target.value);
  };

  const passInputHandler = (event) => {
    setEnteredPass(event.target.value);
  };

  useEffect(() => {
    if (enteredPass.trim() === "") {
      return;
    } else if (enteredPass.length < 7 || enteredPass.length > 10) {
      setEnterPassisValid(false);
      setErrorMsg2("Please fill in 7-10 length password");
      console.log("wrong pass");
    } else setEnterPassisValid(true);
    console.log(enteredPass);
  }, [enteredPass]);

  const emailBlurHandler = () => {
    if (enteredEmail.trim() === "") {
      setErrorMsg("Don't forget to fill in some email");
      setEnterEmailisValid(false);
    }
  };
  useEffect(() => {
    if (enteredEmail.trim() === "") {
      return;
    } else if (!enteredEmail.includes("@")) {
      setErrorMsg("Please enter a valid email including a '@'");
      setEnterEmailisValid(false);
    } else if (!enteredEmail.includes(".")) {
      setErrorMsg("Don't forget the '.'");
      setEnterEmailisValid(false);
    } else if (
      enteredEmail.includes(".") &&
      enteredEmail.lastIndexOf(".") < enteredEmail.indexOf("@")
    ) {
      setErrorMsg("Don't forget the '.'");
      setEnterEmailisValid(false);
    } else setEnterEmailisValid(true);
  }, [enteredEmail]);

  const signUpFunc = async () => {
    setIsLoading(true);
    signupmsg = await dispatch(
      signUpAction({
        email: enteredEmail,
        password: enteredPass,
      })
    );
    setIsLoading(false);
    setEnterPassisValid(false);
    if (signupmsg.payload.userConfirmed)
      setErrorMsg2("Signed up successfully, wait for Or to approve you =]");
    else setErrorMsg2(signupmsg.payload);
    //setErrorMsg2(signupmsg.payload);
  };

  const loginFunc = async () => {
    setIsLoading(true);
    errmsg = await dispatch(
      signInAction({
        email: enteredEmail,
        password: enteredPass,
      })
    );
    setIsLoading(false);
    setEnterPassisValid(false);
    setErrorMsg2(errmsg.payload);
  };
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifContent: "center",
        flex: 1,
        color: "white",
      }}
    >
      <img src={logo} alt="Logo" className={"App-logo"} />
      <h1>Welcome to BlindChat Admin Dash</h1>

      <form className={"form"} onSubmit={formSubmissionHandler}>
        <input
          type="text"
          id="email"
          placeholder="Email"
          className={"input"}
          onChange={emailInputHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
        {!enterEmailisValid && <p>{errorMsg}</p>}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={"input"}
          value={enteredPass}
          onChange={passInputHandler}
        />
        {!enterPassisValid && <p>{errorMsg2}</p>}
        <Div>
          <button
            className="button_signin"
            disabled={!formIsValid}
            onClick={signUpFunc}
          >
            Sign Up
          </button>

          <button
            className="button_signin"
            disabled={!formIsValid}
            onClick={loginFunc}
          >
            Sign In
          </button>
        </Div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};
