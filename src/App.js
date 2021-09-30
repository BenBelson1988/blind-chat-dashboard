import React, { useCallback, useEffect, useState, Component } from "react";
import "./App.css";
import Amplify, { Auth, Hub, loadingLogo } from "aws-amplify";
import awsconfig from "./aws-exports";
import thunk from "redux-thunk";
import authSlicer, {
  setActiveUser,
  signInAction,
} from "./stores/slices/authSlicer";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/router/Main";
import questionsSlicer from "./stores/slices/questionsSlicer";
import interestsSlicer from "./stores/slices/interestsSlicer";

Amplify.configure(awsconfig);

const rootReducer = combineReducers({
  auth: authSlicer,
  questions: questionsSlicer,
  interests: interestsSlicer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function App(props) {
  // in useEffect, we create the listener

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Main />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
