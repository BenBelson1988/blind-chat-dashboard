import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../../../customHooks/useQueryParams";
import CustomLoader from "../auth/common/CustomLoader";
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
  }, [questions]);

  if (isLoading && questionsType !== "games") {
    return <CustomLoader title="Fecthing questions" />;
  }
  return questions.map((question, index) => {
    return <Question index={index} {...question} />;
  });
};
