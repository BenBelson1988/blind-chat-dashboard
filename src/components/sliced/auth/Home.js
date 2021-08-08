import { react } from "@babel/types";
import { homedir } from "os";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUserDetailsAction,
  signOut,
} from "../../../stores/slices/authSlicer";
import "./UI/Home.css";
import Navbar from "../auth/Navbar";
import { useEffect, useSelector } from "react";
import { Auth } from "aws-amplify";

export default () => {
  const dispatch = useDispatch();
  const [appStats, setAppstats] = useState("Loading stats...");

  useEffect(() => {
    const me = dispatch(fetchUserDetailsAction());
    console.log(me);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <button className={"button_signout"} onClick={() => dispatch(signOut())}>
        Sign out
      </button>
      <div className={"grid"}>
        <div className={"home_left"}>
          <h2 className={"left_head"}>App Stats</h2>
          <h2 className={"left_head"}>Questions</h2>
        </div>
        <div className={"home_middle"}>{appStats}</div>
      </div>
    </React.Fragment>
  );
};
