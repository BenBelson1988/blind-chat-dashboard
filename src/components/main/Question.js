import { useEffect, useState } from "react";
import ExpandButton from "../styled/ExpandButton";
import Answers from "../main/Answers";
import EditQuestion from "./EditQuestion";
import useQueryParams from "../../customHooks/useQueryParams";

export default (props) => {
  console.log(props);
  const useParams = useQueryParams();
  const urlchange = useParams["type"];
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState("More details");
  const [isEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState("Edit Question");

  useEffect(() => {
    setEdit(false);
    setEditText("Edit Question");
  }, [urlchange]);
  useEffect(() => {}, [isOpen, isEdit]);

  const toggleOpendiv = () => {
    setIsOpen(!isOpen);
    setExpand(expand === "More details" ? "Close" : "More details");
  };

  const togleEdit = () => {
    setEdit(!isEdit);
    editText === "Edit Question"
      ? setEditText("Cancel editing")
      : setEditText("Edit Question");
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
      {isEdit && <EditQuestion {...props} />}
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
          <ExpandButton onClick={toggleOpendiv}>{expand}</ExpandButton>
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
                  return <Answers {...answer} />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <ExpandButton onClick={togleEdit}>{editText}</ExpandButton>
      </div>
    </div>
  );
};
