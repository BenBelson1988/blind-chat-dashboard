import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "../../stores/slices/interestsSlicer";
import ExpandButton from "../styled/ExpandButton";
import QuestionInput from "../styled/QuestionInput";
import {
  DotsButtonInterests,
  PlusButtonInterest,
  XbuttonInterest,
} from "../styled/Xbutton";
import Xbutton from "../styled/Xbutton";
import { DivideToDivsByChunk } from "../sliced/auth/common/HeplerFunctions";
import AddInterest from "../common/AddInterest";
import CustomLoader from "../sliced/auth/common/CustomLoader";

export default () => {
  const dispatch = useDispatch();
  const interestsList = useSelector(({ interestsState }) => {
    return interestsState.interests;
  });
  const [interestsLocalState, setInterestsLocalState] = useState(interestsList);
  const [edit, SetEdit] = useState(false);
  const [editText, SetEditText] = useState("Edit interests");
  const [EditInterest, setEditInterest] = useState(null);
  const [newInterestText, setNewInterestText] = useState("Add new Interests");
  const [addNewInterest, setAddNewInterest] = useState(false);
  const [EmptyInterest, setEmptyInterest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    interestsList.length === 0 ? setIsLoading(true) : setIsLoading(false);
    setInterestsLocalState(interestsList);
  }, [interestsList]);

  var perChunk = 4; // items per chunk
  var result = DivideToDivsByChunk(interestsLocalState, perChunk);

  const toggleEdit = () => {
    SetEdit(!edit);
    if (edit) {
      SetEditText("Edit interests");
      setEditInterest(null);
      setInterestsLocalState(interestsList);
    } else SetEditText("Cancel editing");
  };

  const deleteInterest = (interestindex) => {
    setEmptyInterest(false);
    setEditInterest(null);
    let newArr = interestsLocalState.filter((_, index) => {
      return index !== interestindex;
    });
    setInterestsLocalState(newArr);
  };

  const editInterestFunc = (e, interestindex) => {
    if (e.target.value === "") {
      setEmptyInterest(true);
      return;
    }
    setEmptyInterest(false);
    let newArr = interestsLocalState.map((interest, index) => {
      if (index === interestindex) return e.target.value;
      return interest;
    });
    setInterestsLocalState(newArr);
  };

  const saveInterest = () => {
    setEditInterest(null);
    SetEditText("Edit Interests");
    SetEdit(false);
    dispatch(updateInterests(interestsLocalState));
  };

  const toggleaddNewInterest = () => {
    setAddNewInterest(!addNewInterest);
    setNewInterestText(
      newInterestText === "Add new Interests" ? "Cancel" : "Add new Interests"
    );
  };

  const addNewInterestToArr = (newInterest) => {
    setInterestsLocalState([...interestsLocalState, newInterest]);
  };

  if (isLoading)
    return (
      <div style={{ minWidth: "1100px" }}>
        <CustomLoader title="Fecthing interests" />
      </div>
    );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minWidth: "1100px" }}
    >
      {addNewInterest && (
        <AddInterest
          toggleaddNewInterest={toggleaddNewInterest}
          addNewInterest={addNewInterestToArr}
        />
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {edit && (
          <ExpandButton
            onClick={() => {
              toggleaddNewInterest();
            }}
            style={{ position: "absolute", left: "15%", top: "15%" }}
          >
            {newInterestText}
          </ExpandButton>
        )}
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
              justifyContent: "space-evenly",
            }}
          >
            {resultChunk.map((interest, index2) => {
              var interestIndex = index * perChunk + index2;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "30px" }}>
                    {edit && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {EditInterest !== interestIndex && (
                          <DotsButtonInterests
                            onClick={() => {
                              setEditInterest(interestIndex);
                              setEmptyInterest(false);
                            }}
                          >
                            ...
                          </DotsButtonInterests>
                        )}

                        {EditInterest === interestIndex && (
                          <DotsButtonInterests
                            onClick={() => {
                              {
                                !EmptyInterest && setEditInterest(null);
                              }
                            }}
                          >
                            ✓
                          </DotsButtonInterests>
                        )}
                        <XbuttonInterest
                          onClick={() => {
                            deleteInterest(interestIndex);
                          }}
                        >
                          x
                        </XbuttonInterest>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      position: "relative",
                      minWidth: "160px",
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>{interestIndex + 1}. </h3>
                    {EditInterest !== interestIndex && (
                      <h3
                        style={{
                          borderRadius: "30px",
                          borderStyle: "solid",
                          borderWidth: "thin",
                          paddingRight: "20px",
                          paddingLeft: "20px",
                          marginLeft: "5px",
                          marginTop: "0",
                          lineHeight: "32px",
                        }}
                      >
                        {interest}
                      </h3>
                    )}

                    {EditInterest === interestIndex && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <QuestionInput
                          style={{
                            width: "200px",
                            fontSize: "15px",
                            marginBottom: "20px",
                          }}
                          type="text"
                          key={interest}
                          defaultValue={interest}
                          onBlur={(e) => {
                            editInterestFunc(e, interestIndex);
                          }}
                        ></QuestionInput>
                        {EmptyInterest && (
                          <p style={{ margin: 0 }}>
                            Empty Interest is not allowed.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
