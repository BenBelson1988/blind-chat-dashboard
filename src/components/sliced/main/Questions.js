import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../auth/UI/Home.css";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { UsernameAttributes } from "aws-amplify-react";
import questionsSlicer, {
  getQuestionListByType,
} from "../../../stores/slices/questionsSlicer";
import { useHistory, useLocation } from "react-router-dom";
import useQueryParams from "../../../customHooks/useQueryParams";
import QuestionsList from "./QuestionsList";
import CustomLoader from "../auth/common/CustomLoader";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeQuestiontype = useQueryParams().type;

  useEffect(() => {
    history.push({
      search: "?type=basic",
    });
  }, []);
  useEffect(() => {
    Promise.all([
      dispatch(getQuestionListByType("basic")),
      dispatch(getQuestionListByType("traits")),
      dispatch(getQuestionListByType("swippable")),
      dispatch(getQuestionListByType("game")),
    ]);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={`question-type ${
            activeQuestiontype === "basic" ? "active" : ""
          }`}
          onClick={() => {
            history.push({
              search: "?type=basic",
            });
          }}
        >
          Basic
        </div>
        <div
          className={`question-type ${
            activeQuestiontype === "traits" ? "active" : ""
          }`}
          onClick={() => {
            history.push({
              search: "?type=traits",
            });
          }}
        >
          Traits
        </div>
        <div
          className={`question-type ${
            activeQuestiontype === "swippable" ? "active" : ""
          }`}
          onClick={() => {
            history.push({
              search: "?type=swippable",
            });
          }}
        >
          Swippable
        </div>
        <div
          className={`question-type ${
            activeQuestiontype === "games" ? "active" : ""
          }`}
          onClick={() => {
            history.push({
              search: "?type=games",
            });
          }}
        >
          Games
        </div>
      </div>
      <QuestionsList />
    </div>
  );
};
