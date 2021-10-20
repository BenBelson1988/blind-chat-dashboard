import FloatingDiv from "../styled/FloatingDiv";
import QuestionInput from "../styled/QuestionInput";
import ExpandButton from "../styled/ExpandButton";
import { useRef, useState, useEffect } from "react";

export default (props) => {
  const [interest, setInterest] = useState("Please enter interest");
  const [error, setError] = useState(false);
  const ref = useRef();
  ////////Handle click outsode
  const HandleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.toggleaddNewInterest(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", HandleClickOutside, true);
  });
  ///////
  const onChangeInterest = (e) => {
    if (e.target.value === "") {
      setInterest(e.target.value);
      setError(true);
    } else {
      setInterest(e.target.value);
      setError(false);
    }
  };
  const addInterestFunc = () => {
    if (interest === "") {
      setError(true);
      return;
    }
    props.addNewInterest(interest);
    setInterest("");
  };
  return (
    <FloatingDiv ref={ref}>
      <h3 style={{ backgroundColor: "black", margin: "0", lineHeight: "55px" }}>
        Add Interest
      </h3>
      <h4>Enter Interests as much as you like, When you finish press "Done"</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QuestionInput
          type="text"
          id="newInterest"
          value={interest}
          onChange={(e) => {
            onChangeInterest(e);
          }}
        />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <ExpandButton
            disabled={error}
            onClick={() => {
              addInterestFunc();
            }}
          >
            Add interest
          </ExpandButton>
        </div>

        <ExpandButton
          style={{ position: "fixed", left: "90%", top: "0" }}
          onClick={() => {
            props.toggleaddNewInterest();
          }}
        >
          X
        </ExpandButton>
      </div>
      <div style={{ height: "60px" }}>
        {error && (
          <p style={{ color: "#179fa6", margin: "0" }}>
            {" "}
            Interest cannot be empty
          </p>
        )}
      </div>
      <ExpandButton
        onClick={() => {
          props.toggleaddNewInterest();
        }}
      >
        Done
      </ExpandButton>
    </FloatingDiv>
  );
};
