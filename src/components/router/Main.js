import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import LoginSignUp from "../sliced/auth/LoginSignUp";
import Navbar from "../sliced/auth/common/Navbar";
import RouteGuard from "./RouteGuard";
import Home from "../router/Home";
import React, {useEffect, useRef} from "react";
import { Auth, Hub } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../stores/slices/authSlicer";


const usePrev =  (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


export default () => {
  const { username } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    Auth.currentSession().then(({ idToken: { payload } }) => {
      dispatch(setActiveUser(payload));
    });
  }, []);

  useEffect(() => {
    if (username) {
      history.push("/home");
    }
  }, [username]);

  return (
    <>
      {username && <Navbar />}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/auth">
          <LoginSignUp />
        </Route>
        <RouteGuard path="/home">
          <Home />
        </RouteGuard>
      </Switch>
    </>
  );
};
