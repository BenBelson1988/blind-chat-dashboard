import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteQuestionfunc } from "../../stores/slices/questionsSlicer";
import ExpandButton from "../styled/ExpandButton";
import FloatingDiv from "../styled/FloatingDiv";

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const HandleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.setDeleteQuestion(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", HandleClickOutside, true);
  });
  return (
    <FloatingDiv ref={ref}>
      <div
        style={{
          backgroundColor: "black",
          lineHeight: "55px",
          fontSize: "20px",
          fontWeight: "bolder",
        }}
      >
        Delete question
      </div>
      <h4>Are you sure you want to delete question - "{props.body}"?</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100px",
          alignItems: "flex-end",
        }}
      >
        <ExpandButton
          style={{ width: "100px" }}
          onClick={() => {
            dispatch(deleteQuestionfunc(props.id));
            history.push("/home");
          }}
        >
          Yes
        </ExpandButton>
        <ExpandButton
          style={{ width: "100px" }}
          onClick={() => {
            props.setDeleteQuestion(false);
          }}
        >
          No
        </ExpandButton>
      </div>
      <ExpandButton
        style={{ position: "fixed", left: "90%", top: "0" }}
        onClick={() => {
          props.setDeleteQuestion(false);
        }}
      >
        X
      </ExpandButton>
    </FloatingDiv>
  );
};
