import { useHistory } from "react-router-dom";
import useQueryParams from "../../../customHooks/useQueryParams";

export default (props) => {
  const activeQuestiontype = useQueryParams().type;

  return <div></div>;
};
