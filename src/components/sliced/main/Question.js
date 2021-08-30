import { selectInput } from "aws-amplify";
import { Label } from "aws-amplify-react";
import { useEffect, useState, useRef } from "react";
import ExpandButton from "../../styled/ExpandButton";
import MenuButton from "../../styled/MenuButton";
import QuestionInput from "../../styled/QuestionInput";

export default (props) => {
  console.log(props);
  const [isOpen, setSinOpen] = useState(false);
  const [expand, setExpand] = useState("More details");
  const [isEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState("Edit Question");
  const [answersTest, setAnswersTest] = useState(props.answers);

  const titleInputRef = useRef(props.body);
  const answersObject = useRef(props.answers);

  useEffect(() => {}, [isOpen, isEdit]);

  const toggleOpendiv = () => {
    setSinOpen(!isOpen);
    setExpand(expand === "More details" ? "Close" : "More details");
  };

  const togleEdit = () => {
    setEdit(!isEdit);
    editText === "Edit Question"
      ? setEditText("Cancel editing")
      : setEditText("Edit Question");
  };

  const updateCurrentRef = (e, value) => {
    if (value === "title") {
      titleInputRef.current.value = e.target.value;
      console.log(titleInputRef.current.value);
    }
  };
  const testFunc = (ansIndex) => {
    var test = props.answers[ansIndex].effects;
    var newtest = [...test, { feature: "Please Choose value", value: 0.1 }];
    console.log(newtest);
  };
  return (
    <div
      style={{
        backgroundImage:
          " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      {isEdit && (
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
            ref={titleInputRef}
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
            {props.answers.map((answer, answerIndex) => {
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
                  <h5 style={{ marginBottom: "5px", marginTop: "5px" }}>
                    Effects
                  </h5>
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
                  <ExpandButton
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "15px",
                      width: "30px",
                      height: "25px",
                    }}
                    onClick={() => {
                      testFunc(answerIndex);
                    }}
                  >
                    +
                  </ExpandButton>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!isEdit && (
        <div>
          <img
            src={props.imageUrl}
            alt={"png"}
            style={{ width: "70px", height: "70px" }}
          />
          <h2 style={{ color: "white" }}>
            {props.index + 1}. {props.body}
          </h2>
          <ExpandButton
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              borderRadius: "10px",
              margin: "20px",
              padding: "10px",
              color: "white",
              backgroundImage:
                " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
              border: "none",
              boxShadow: "0px 0px 0px 1px #7e7c7c",
            }}
            onClick={toggleOpendiv}
          >
            {expand}
          </ExpandButton>
          {isOpen && (
            <div>
              <h3 style={{ color: "lightgray", marginBottom: "-5px" }}>
                Answers
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {props.answers.map((answer) => {
                  return (
                    <div>
                      <p
                        style={{
                          minWidth: "40px",
                          fontWeight: "bolder",
                          paddingRight: "5px",
                          paddingLeft: "5px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          marginLeft: "20px",
                          marginRight: "20px",
                          color: "white",
                          borderRadius: "15px",
                          boxShadow: "0 0 0 1pt grey",
                          backgroundImage:
                            "linear-gradient(135deg, rgba(64,85,83,0.6334908963585435) 0%, rgba(0,51,54,0.6474964985994398) 85%)",
                        }}
                      >
                        {answer.body}
                      </p>
                      {answer.iceBreaker === "" ? (
                        ""
                      ) : (
                        <>
                          <h5 style={{ color: "white", marginBottom: "-5px" }}>
                            Ice Breaker-
                          </h5>

                          <p
                            style={{
                              color: "lightgray",
                              fontSize: "13px",
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                          >
                            {answer.iceBreaker}
                          </p>
                        </>
                      )}
                      <h5
                        style={{
                          margin: "0",
                          padding: "0",
                        }}
                      >
                        Effects-
                      </h5>
                      {answer.effects.map((effect) => {
                        return (
                          <p
                            style={{
                              fontSize: "13px",
                              color: "lightgray",
                            }}
                          >
                            {effect.feature} - {effect.value}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        style={{
          direction: "flex",
          flexDirection: "row",
          textAlign: "end",
        }}
      >
        <ExpandButton
          onClick={togleEdit}
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "10px",
            margin: "20px",
            padding: "10px",
            color: "white",
            backgroundImage:
              " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
            border: "none",
            boxShadow: "0px 0px 0px 1px #7e7c7c",
          }}
        >
          {editText}
        </ExpandButton>
      </div>
    </div>
  );
};
