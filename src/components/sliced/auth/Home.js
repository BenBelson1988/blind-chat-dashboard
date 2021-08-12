import { react } from "@babel/types";
import { homedir } from "os";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authSlicer, {
  fetchUserDetailsAction,
  getQuestionList,
  signOut,
} from "../../../stores/slices/authSlicer";
import "./UI/Home.css";
import Navbar from "../auth/Navbar";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { UsernameAttributes } from "aws-amplify-react";
import Question from "./Question";

export default () => {
  const username = useSelector(({ auth }) => auth.username);
  const dispatch = useDispatch();
  const [appStats, setAppstats] = useState("Loading stats...");
  const [activeUser, setActiveUser] = useState("");
  const [questionsClicked, setQuestionClicked] = useState(false);
  const [appStatsClicked, setappStatsClicked] = useState(true);
  let questionsTest = null;
  let appStatsString = null;

  useEffect(() => {
    if (username == "951efce6-bc4b-4cb4-98ac-3b2cbd1a3958")
      setActiveUser("Ben");
  }, [username]);

  const testFunc = async () => {
    setappStatsClicked(false);
    questionsTest = await dispatch(getQuestionList());
    setQuestionClicked(true);
    console.log(questionsTest.payload.items);
    setAppstats(JSON.stringify(questionsTest.payload.items[0].body));
  };

  const appStatsFunc = async () => {
    setQuestionClicked(false);
    setappStatsClicked(true);
    //appStatsString = await dispatch(appstats());
  };

  return (
    <React.Fragment>
      <Navbar />
      <h3 className={"name"}>Hi, {activeUser}</h3>
      <div className={"grid"}>
        <div className={"home_left"}>
          <div className={"left_bar"} onClick={appStatsFunc}>
            App Stats
          </div>
          <div className={"left_bar"} onClick={testFunc}>
            Questions
          </div>
        </div>
        {questionsClicked && (
          <div className={"home_middle"}>
            <div className={"question-type"}>Basic</div>
            <div className={"question-type"}>Traits</div>
            <div className={"question-type"}>Swippable</div>
            <div className={"question-type"}>Games</div>
            <Question title={"lalalalalalala"} />
          </div>
        )}
        {appStatsClicked && (
          <div className={"home_middle"}>
            <div className={"question-type"}>Total users: 4828</div>
            <div className={"question-type"}>Users online: 492 </div>
            <div className={"question-type"}>#3 Stats</div>
            <div className={"question-type"}>#4 stats</div>
          </div>
        )}
      </div>
      <button
        className={"button_signout"}
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign out
      </button>
    </React.Fragment>
  );
};
