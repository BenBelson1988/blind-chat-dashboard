import { useState } from "react";
import ExpandButton from "../styled/ExpandButton";
import QuestionInput from "../styled/QuestionInput";
import EditQuestion from "./EditQuestion";

export default (props) => {
  const [QuestionType, setQuestionType] = useState("basic");

  function getRandomString(length) {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
  let newQuestion = {
    body: "Please enter question",
    id: getRandomString(26),
    domain: "",
    answers: [
      {
        body: "Please enter answer",
        effects: [
          {
            feature: "Forgivingness",
            value: 0.1,
          },
        ],
        iceBreaker: "Please enter iceBreaker",
        id: Math.floor(Math.random(100) * 1000),
        count: 0,
      },
      {
        body: "Please enter answer 2",
        effects: [
          {
            feature: "Forgivingness",
            value: 0.1,
          },
        ],
        iceBreaker: "Please enter iceBreaker 2",
        id: Math.floor(Math.random(100) * 1000),
        count: 0,
      },
    ],
  };

  console.log(newQuestion);
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
      <h2
        style={{
          backgroundColor: "black",
          marginBottom: "10px",
          marginTop: "0",
          padding: "15px",
        }}
      >
        Add new question
      </h2>
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
          <option>basic</option>
          <option>traits</option>
          <option>swippable</option>
          <option>games</option>
        </select>
      </div>
      <EditQuestion new={true} type={QuestionType} {...newQuestion} />
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
