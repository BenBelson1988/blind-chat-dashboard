import {
    fetchUserDetailsAction,
    signInAction,
    signUpAction,
} from "../../../stores/slices/authSlicer";
import {Auth} from "aws-amplify";
import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {useSelector} from "react-redux";
import logo from "../../../logo.svg";
import "./UI/LoginSignUp.css";
import {useState} from "react";
import {Link} from "react-router-dom";
import {propStyle} from "aws-amplify-react";

const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

function checkUser() {
    Auth.currentAuthenticatedUser()
        .then((user) => console.log({user}))
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

    const dispatch = useDispatch();
    const [userId] = useSelector(({auth}) => {
        return [auth.attributes?.sub];
    });

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserDetailsAction());
        }
    }, [userId]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifContent: 'center',
            flex:1,
            color: "white"
        }}>
            <img src={logo} alt="Logo" className={"App-logo"}/>
            <h1>Welcome to BlindChat Admin Dash</h1>
            <form onSubmit={formSubmissionHandler}>
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
                        className="button-signin"
                        disabled={true}
                        onClick={() => {
                            dispatch(
                                signUpAction({
                                    email: "belson1988@gmail.com",
                                    password: "1234567",
                                })
                            );
                        }}
                    >
                        Sign Up
                    </button>

                    <button
                        className="button-signin"
                        disabled={!formIsValid}
                        onClick={() => {
                            dispatch(
                                signInAction({
                                    email: enteredEmail, //email: "belson1988@gmail.com",
                                    password: enteredPass, // password: "1234567",
                                })
                            );
                        }}
                    >
                        Sign In
                    </button>

                </Div>
            </form>
        </div>
    );
};
