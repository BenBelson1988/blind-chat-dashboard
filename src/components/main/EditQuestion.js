import QuestionInput from "../styled/QuestionInput";
import ExpandButton from "../styled/ExpandButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { putQuestionfunc } from "../../stores/slices/questionsSlicer";
import useQueryParams from "../../customHooks/useQueryParams";
import { useHistory } from "react-router";

export default (props) => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const dispatch = useDispatch();
  const questionsType = queryParams["type"];
  const questionRef = useRef(props.body);
  const idRef = useRef(props.id);
  const domainRef = useRef(props.domain);
  const [answersState, setAnswersState] = useState(props.answers);

  console.log("Answers", answersState);

  const updateCurrentRef = (e, value) => {
    if (value === "title") {
      questionRef.current.value = e.target.value;
      ref.body = questionRef.current.value;
    }
  };

  const addAnswer = () => {
    console.log(answersState);
    setAnswersState((prevState) => [
      ...prevState,
      {
        body: "test",
        effects: [
          {
            feature: "test",
            value: 0.1,
          },
        ],
        iceBreaker: "test",
      },
    ]);
  };

  const addEffect = (answerIndex) => {
    /*
    setAnswersState((prevState) => [...prevState,
    prevState.map((answertemp,index =>{
      if(index === answerIndex){

      }
    })]);
    debugger;
  */
  };

  var ref = {
    body: "",
    id: idRef.current,
    type: questionsType,
  };

  return (
    <div
      style={{
        direction: "flex",
        flexDirection: "column",
      }}
    >
      <label>Question: </label>

      <QuestionInput
        style={{ width: "50%" }}
        type="text"
        ref={questionRef}
        defaultValue={props.body}
        onInput={(e) => updateCurrentRef(e, "title")}
      ></QuestionInput>
      <h3 style={{ color: "lightgray", marginBottom: "5px" }}>Answers</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {answersState.map((answer, answerIndex) => {
          return (
            <div>
              <label>{answerIndex + 1}.</label>
              <QuestionInput
                style={{ marginRight: "20px" }}
                type="text"
                defaultValue={answer.body}
              ></QuestionInput>
              {answer.iceBreaker === "" ? (
                ""
              ) : (
                <>
                  <h5 style={{ color: "white", marginBottom: "-5px" }}>
                    Ice Breaker-
                  </h5>

                  <QuestionInput
                    type="text"
                    defaultValue={answer.iceBreaker}
                    style={{
                      color: "lightgray",
                      fontSize: "13px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  ></QuestionInput>
                </>
              )}
              <h5 style={{ marginBottom: "5px", marginTop: "5px" }}>Effects</h5>
              {answer.effects.map((effect) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <select
                        defaultValue={effect.feature}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "15px",
                          height: "25px",
                          marginRight: "20px",
                          width: "100px",
                        }}
                      >
                        <option>Forgivingness</option>
                        <option>Altruism</option>
                        <option>Inquisitiveness</option>
                        <option>Unconventionality</option>
                        <option>Sport</option>
                        <option>Familial</option>
                        <option>Religion</option>
                        <option>Diligence</option>
                        <option>Flexibility</option>
                        <option>Liveliness</option>
                      </select>
                      <QuestionInput
                        style={{
                          width: "50px",
                          margin: "0",
                        }}
                        step="0.05"
                        min="0.1"
                        max="1"
                        type="number"
                        defaultValue={effect.value}
                      ></QuestionInput>
                    </div>
                  </div>
                );
              })}
              <h6 style={{ margin: "0px", paddingTop: "10px" }}>Add effect</h6>
              <ExpandButton
                style={{
                  height: "30px",
                }}
                onClick={() => {
                  addEffect(answerIndex);
                }}
              >
                +
              </ExpandButton>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <h6 style={{ margin: "0px" }}>Add answer</h6>
          <ExpandButton
            onClick={() => addAnswer()}
            style={{ height: "40px", width: "40px" }}
          >
            +
          </ExpandButton>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <ExpandButton
          onClick={() => {
            debugger;
            dispatch(putQuestionfunc(ref));
            history.push("/home");
          }}
        >
          Save question
        </ExpandButton>
      </div>
    </div>
  );
};
