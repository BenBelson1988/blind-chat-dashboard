import React, { useCallback, useEffect, useState, Component } from "react";
import "./App.css";
import Amplify, { Auth, Hub, loadingLogo } from "aws-amplify";
import awsconfig from "./aws-exports";
import thunk from "redux-thunk";
import authSlicer, { signInAction } from "./stores/slices/authSlicer";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import LoginSignUp from "./components/sliced/auth/LoginSignUp";
import Home from "./components/sliced/auth/Home";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

Amplify.configure(awsconfig);

const rootReducer = combineReducers({
  auth: authSlicer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function App(props) {
  // in useEffect, we create the listener

  useEffect(() => {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log("A new auth event has happened: ", data);
      if (payload.event === "signIn") {
        console.log("a user has signed in!");
        console.log(payload.data.username);
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/LogIn" />
            </Route>
            <Route exact path="/LogIn">
              <header className="App-header">
                <LoginSignUp />
              </header>
            </Route>
            (
            <Route exact path="/Home">
              <Home />
            </Route>
            )
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
