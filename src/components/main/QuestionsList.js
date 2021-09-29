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
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    questions.length === 0 ? setIsloading(true) : setIsloading(false);
    console.log(questions);
  }, [questions]);

  if (isLoading) {
    return <CustomLoader title="Fecthing questions" />;
  }
  return (
    <>
      <h1
        style={{
          fontSize: "30px",
          alignSelf: "center",
        }}
      >
        {questions.length} questions in type {questionsType}.
      </h1>
      {questions.map((question, index) => {
        return <Question index={index} {...question} />;
      })}
    </>
  );
};
