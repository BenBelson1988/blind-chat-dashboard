import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../sliced/auth/UI/Home.css";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { UsernameAttributes } from "aws-amplify-react";
import questionsSlicer, {
  getQuestionListByType,
} from "../../stores/slices/questionsSlicer";
import { useHistory, useLocation } from "react-router-dom";
import useQueryParams from "../../customHooks/useQueryParams";
import QuestionsList from "./QuestionsList";
import CustomLoader from "../sliced/auth/common/CustomLoader";
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
    </>
  );
};
