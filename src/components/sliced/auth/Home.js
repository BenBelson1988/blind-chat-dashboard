import { react } from "@babel/types";
import { homedir } from "os";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authSlicer, {
  fetchUserDetailsAction,
  signOut,
} from "../../../stores/slices/authSlicer";
import "./UI/Home.css";
import Navbar from "../auth/Navbar";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { UsernameAttributes } from "aws-amplify-react";

export default () => {
  const username = useSelector(({ auth }) => auth.username);
  const dispatch = useDispatch();
  const [appStats, setAppstats] = useState("Loading stats...");
  const [activeUser, setActiveUser] = useState("");
  let me = null;

  useEffect(() => {
    if (username == "951efce6-bc4b-4cb4-98ac-3b2cbd1a3958")
      setActiveUser("Ben");
    console.log(username);
  }, [username]);

  useEffect(() => {
    me = dispatch(fetchUserDetailsAction());
    console.log(me);
    setAppstats("test");
  }, [me]);

  const testFunc = () => {
    setAppstats("on click worked");
  };

  return (
    <React.Fragment>
      <Navbar />
      <h3 className={"name"}>Hi, {activeUser}</h3>
      <div className={"grid"}>
        <div className={"home_left"}>
          <div className={"left_bar"}>App Stats</div>
          <div className={"left_bar"} onClick={testFunc}>
            Questions
          </div>
        </div>
        <div className={"home_middle"}>{appStats}</div>
      </div>
      <button className={"button_signout"} onClick={() => dispatch(signOut())}>
        Sign out
      </button>
    </React.Fragment>
  );
};
