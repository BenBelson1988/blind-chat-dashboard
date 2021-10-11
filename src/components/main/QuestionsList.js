import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../../customHooks/useQueryParams";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import Question from "./Question";

export default () => {
  const queryParams = useQueryParams();
  const questionsType = queryParams["type"];
  const questions = useSelector(({ questions }) => {
    return questions[questionsType] || [];
  });

  const isLoading2 = Object.keys(questions).length === 0;

  return (
    <>
      {isLoading2 && <CustomLoader title="Fecthing questions" />}
      {!isLoading2 && (
        <h1
          style={{
            fontSize: "30px",
            alignSelf: "center",
          }}
        >
          {questions.length} questions in type {questionsType}.
        </h1>
      )}
      {!isLoading2 &&
        questions.map((question, index) => {
          return <Question index={index} {...question} />;
        })}
    </>
  );
};
