import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "../../stores/slices/interestsSlicer";
import ExpandButton from "../styled/ExpandButton";
import PointsButton from "../styled/PointsButton";
import QuestionInput from "../styled/QuestionInput";
import Xbutton from "../styled/Xbutton";

export default () => {
  const dispatch = useDispatch();
  const interestsList = useSelector(({ interestsState }) => {
    debugger;
    return interestsState.interests;
  });
  debugger;
  const [interestsLocalState, setInterestsLocalState] = useState(interestsList);
  const [edit, SetEdit] = useState(false);
  const [editText, SetEditText] = useState("Edit interests");
  const [EditInterest, setEditInterest] = useState(null);

  var perChunk = 5; // items per chunk
  var result = interestsLocalState.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  const toggleEdit = () => {
    SetEdit(!edit);
    if (edit) {
      SetEditText("Edit interests");
      setEditInterest(null);
      setInterestsLocalState(interestsList);
    } else SetEditText("Cancel editing");
  };

  const deleteInterest = (interestindex) => {
    let newArr = interestsLocalState.filter((_, index) => {
      return index !== interestindex;
    });
    setInterestsLocalState(newArr);
  };

  const editInterestFunc = (e, interestindex) => {
    let newArr = interestsLocalState.map((interest, index) => {
      if (index === interestindex) return e.target.value;
      return interest;
    });
    setEditInterest(null);
    setInterestsLocalState(newArr);
  };

  const saveInterest = () => {
    setEditInterest(null);
    SetEditText("Edit Interests");
    dispatch(updateInterests(interestsLocalState));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minWidth: "1100px" }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            borderRadius: "15px",
            borderStyle: "solid",
            borderWidth: "thin",
            width: "400px",
            alignSelf: "center",
            height: "40px",
            backgroundImage:
              " linear-gradient(135deg, rgba(0,45,50,1) 0%, rgba(0,0,0,0.865983893557423) 95%)",
          }}
        >
          List of interests
        </h2>
        <ExpandButton
          onClick={() => {
            toggleEdit();
          }}
          style={{ position: "absolute", left: "85%", top: "15%" }}
        >
          {editText}
        </ExpandButton>
        {edit && (
          <ExpandButton
            onClick={() => {
              saveInterest();
            }}
            style={{ position: "absolute", left: "70%", top: "15%" }}
          >
            Save interests
          </ExpandButton>
        )}
      </div>
      {result.map((resultChunk, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {resultChunk.map((interest, index2) => {
              var interestIndex = index * 7 + index2;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                    minHeight: "110px",
                    minWidth: "160px",
                  }}
                >
                  {edit && (
                    <>
                      <Xbutton
                        onClick={() => {
                          deleteInterest(interestIndex);
                        }}
                      >
                        x
                      </Xbutton>
                      {EditInterest !== interestIndex && (
                        <PointsButton
                          onClick={() => {
                            setEditInterest(interestIndex);
                          }}
                        >
                          ...
                        </PointsButton>
                      )}
                      {EditInterest === interestIndex && (
                        <PointsButton
                          onClick={() => {
                            setEditInterest(null);
                          }}
                        >
                          ✓
                        </PointsButton>
                      )}
                    </>
                  )}
                  <h3>{interestIndex + 1}. </h3>
                  {EditInterest !== interestIndex && (
                    <h3
                      style={{
                        borderRadius: "30px",
                        borderStyle: "solid",
                        borderWidth: "thin",
                        paddingRight: "20px",
                        paddingLeft: "20px",
                        marginLeft: "5px",
                        lineHeight: "32px",
                      }}
                    >
                      {interest}
                    </h3>
                  )}
                  {EditInterest === interestIndex && (
                    <QuestionInput
                      style={{ width: "200px", fontSize: "15px" }}
                      type="text"
                      key={interest}
                      defaultValue={interest}
                      onBlur={(e) => {
                        editInterestFunc(e, interestIndex);
                      }}
                    ></QuestionInput>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
