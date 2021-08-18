import { useSelector } from "react-redux";
import useQueryParams from "../../../customHooks/useQueryParams";
import Question from "./Question";

export default () => {
  const queryParams = useQueryParams();
  const questionsType = queryParams["type"];
  debugger;
  const questions = useSelector(({ questions }) => {
    return questions[questionsType] || [];
  });

  return questions.map((question) => {
    return <Question {...question} />;
  });
};
