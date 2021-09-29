import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteQuestionfunc } from "../../stores/slices/questionsSlicer";
import ExpandButton from "../styled/ExpandButton";

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
    <div
      ref={ref}
      style={{
        zIndex: "10",
        minWidth: "500px",
        minHeight: "250px",
        backgroundImage:
          " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
        position: "fixed",
        left: "50%",
        top: "30%",
        transform: "translate(-50%, 0)",
        boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
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
            debugger;
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
    </div>
  );
};
