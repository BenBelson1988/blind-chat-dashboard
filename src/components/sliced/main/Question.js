import { useEffect, useState } from "react";
import ExpandButton from "../../styled/ExpandButton";
import MenuButton from "../../styled/MenuButton";
import QuestionInput from "../../styled/QuestionInput";
import EditQuestion from "./EditQuestion";

export default (props) => {
  console.log(props);
  const [isOpen, setSinOpen] = useState(false);
  const [expand, setExpand] = useState("More details");
  const [isEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState("Edit Question");
  const [title, setTitle] = useState(props.body);
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

  const handleChange = (e, value) => {
    if (value === "title") {
      setTitle(e.target.value);
      console.log(title);
    }
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
        <div>
          <label>Question: </label>
          <QuestionInput
            type="text"
            value={title}
            name="test"
            onInput={(e) => handleChange(e, "title")}
          ></QuestionInput>
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
                        <h5 style={{ color: "white", marginBottom: "-5px" }}>
                          Ice Breaker-
                        </h5>
                      )}
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
