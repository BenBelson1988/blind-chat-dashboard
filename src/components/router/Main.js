import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import LoginSignUp from "../sliced/auth/LoginSignUp";
import Navbar from "../sliced/auth/common/Navbar";
import RouteGuard from "./RouteGuard";
import Home from "../router/Home";
import React, { useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../stores/slices/authSlicer";

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
    //debugger
    if (username) {
      history.push("/home");
    }
  }, [username]);
  // useEffect(() => {
  //     Hub.listen("auth", (data) => {
  //         const {payload} = data;
  //         console.log("A new auth event has happened: ", data);
  //         if (payload.event === "signIn") {
  //             console.log("a user has signed in!");
  //             console.log(payload.data);
  //         }
  //         if (payload.event === "signOut") {
  //             console.log("a user has signed out!");
  //         }
  //     });
  // }, []);

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
