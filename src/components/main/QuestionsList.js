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
  const isLoading = useSelector(({ questions }) => {
    return questions.isLoading;
  });

  return (
    <>
      {isLoading && <CustomLoader title="Fecthing questions" />}
      {!isLoading && (
        <h1
          style={{
            fontSize: "30px",
            alignSelf: "center",
          }}
        >
          {questions.length} questions in type {questionsType}.
        </h1>
      )}
      {!isLoading &&
        questions.map((question, index) => {
          return <Question index={index} {...question} />;
        })}
    </>
  );
};
