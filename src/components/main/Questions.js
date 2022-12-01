import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import "../sliced/auth/UI/Home.css";
import { useEffect } from "react";
import {
  getQuestionListByType,
} from "../../stores/slices/questionsSlicer";
import { useHistory } from "react-router-dom";
import useQueryParams from "../../customHooks/useQueryParams";
import QuestionsList from "./QuestionsList";
import ExpandButton from "../styled/ExpandButton";
import AddQuestion from "./AddQuestion";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeQuestiontype = useQueryParams().type;
  const [addQuestion, setAddQuestion] = useState(false);

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
    <>
      {addQuestion && <AddQuestion setAddQuestion={setAddQuestion} />}
      <ExpandButton
        style={{
          fontSize: "20px",
          width: "300px",
          backgroundImage:
            " linear-gradient(0deg, rgba(13,78,80,1) 0%, rgba(38,38,38,1) 100%)",
        }}
        onClick={() => {
          setAddQuestion(true);
        }}
      >
        Add new question
      </ExpandButton>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
              activeQuestiontype === "game" ? "active" : ""
            }`}
            onClick={() => {
              history.push({
                search: "?type=game",
              });
            }}
          >
            Games
          </div>
        </div>
        <QuestionsList />
      </div>
    </>
  );
};
