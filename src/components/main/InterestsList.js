import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandButton from "../styled/ExpandButton";

export default () => {
  const dispatch = useDispatch();
  const interestsList = useSelector(({ interests }) => {
    return interests.interests || [];
  });
  const [interestsState, setInterestsState] = useState(interestsList);
  const [edit, SetEdit] = useState(false);
  const [editText, SetEditText] = useState("Edit interests");
  var perChunk = 7; // items per chunk
  var result = interestsState.reduce((resultArray, item, index) => {
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
      setInterestsState(interestsList);
    } else SetEditText("Cancel editing");
  };

  const deleteInterest = (interestindex) => {
    let newArr = interestsState.filter((_, index) => {
      return index !== interestindex;
    });
    setInterestsState(newArr);
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
            onClick={() => {}}
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
                  }}
                >
                  {edit && (
                    <button
                      onClick={() => {
                        deleteInterest(interestIndex);
                      }}
                      style={{
                        backgroundColor: "black",
                        borderRadius: "40px",
                        color: "white",
                        position: "absolute",
                        left: "100%",
                        top: "15%",
                        cursor: "pointer",
                        borderStyle: "double",
                      }}
                    >
                      x
                    </button>
                  )}
                  <h3>{interestIndex + 1}. </h3>
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
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
