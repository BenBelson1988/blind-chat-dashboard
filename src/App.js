import React, { useCallback, useEffect } from "react";
import "./App.css";
import Amplify, { Auth, Hub, loadingLogo } from "aws-amplify";
import awsconfig from "./aws-exports";
import thunk from "redux-thunk";
import authSlicer, { signInAction } from "./stores/slices/authSlicer";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import LoginSignUp from "./components/sliced/auth/LoginSignUp";

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
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <LoginSignUp />
        </header>
      </div>
    </Provider>
  );
}

export default App;
