import { useState } from "react";
import ExpandButton from "../styled/ExpandButton";
import QuestionInput from "../styled/QuestionInput";

export default (props) => {
  const [QuestionType, setQuestionType] = useState("Basic");
  const [questionBody, setQuestionBody] = useState("");
  return (
    <div
      style={{
        zIndex: "10",
        minWidth: "1000px",
        minHeight: "500px",
        backgroundImage:
          " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
        position: "fixed",
        left: "50%",
        transform: "translate(-50%, 0)",
        boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <h2>Add new question</h2>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "20px", marginRight: "10px" }}>
          Choose type
        </label>
        <select
          onChange={(e) => {
            setQuestionType(e.target.value);
          }}
          defaultValue={QuestionType}
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            height: "25px",
            marginRight: "20px",
            width: "150px",
            fontSize: "20px",
          }}
        >
          Please select type
          <option>Basic</option>
          <option>Traits</option>
          <option>Swippable</option>
          <option>Games</option>
        </select>
      </div>
      <label>Question</label>
      <QuestionInput
        style={{ width: "300px" }}
        type="text"
        key={questionBody}
        defaultValue={questionBody}
        onBlur={(e) => {
          setQuestionBody(e.target.value);
        }}
      ></QuestionInput>

      <ExpandButton
        style={{ position: "fixed", left: "95%", top: "0" }}
        onClick={() => {
          props.setAddQuestion(false);
        }}
      >
        X
      </ExpandButton>
    </div>
  );
};
