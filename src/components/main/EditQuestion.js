import QuestionInput from "../styled/QuestionInput";
import ExpandButton from "../styled/ExpandButton";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    putQuestionfunc,
    addQuestionfunc,
    getQuestionListByType,
} from "../../stores/slices/questionsSlicer";
import useQueryParams from "../../customHooks/useQueryParams";
import {useHistory} from "react-router";
import FormError from "../sliced/auth/common/FormError";
import DeleteQuestion from "./DeleteQuestion";
import {CenteredColumnDiv} from "../styled/Divs";
import API from "@aws-amplify/api";

/*image uploading*/

export const openFileDialog = (callback) => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
        // getting a hold of the file reference
        const file = e.target.files[0];
        callback(file);
        // setting up the reader
    };
    input.click();
};

const createFormData = (file, body) => {
    const form = new FormData();
    for (const field in body) {
        form.append(field, body[field]);
    }

    form.append("file", file, file.name);

    body["type"] = file.type;

    for (let key in body) {
        form.append(key, body[key]);
    }

    return form;
};

export default (props) => {
    const queryParams = useQueryParams();
    const dispatch = useDispatch();
    var questionsType = queryParams["type"];
    const features = useSelector(({features}) => {
        return features.features;
    });
    const [questionBody, SetquestionBody] = useState(props.body);
    const [questionError, setQuestionError] = useState(false);
    const [answerError, setAnswerError] = useState(false);
    const [iceBreakerError, setIceBreakerError] = useState(false);
    const idRef = useRef(props.id);
    const [questionDomian, setQuestionDomain] = useState(props.domain);
    const [questionFeature, setQuestionfeature] = useState(props.feature);
    const [questionCategory, setQuestionCategory] = useState(props.category);
    const [answersState, setAnswersState] = useState(props.answers);
    const [imageState, setImageState] = useState(props.imageUrl);
    const [file, setFile] = useState();
    const [deleteQuestion, setDeleteQuestion] = useState(false);
    const [subFeatures, setSubFeatures] = useState(
        features
            .find((feature) => feature.domain.name === props.domain)
            .domain.subFeatures.map((subFeature) => {
            return subFeature.name;
        })
    );

    if (props.new) {
        questionsType = props.type;
    }

    const allSubFeatures = [];
    features.map((feature) => {
        feature.domain.subFeatures.map((subFeature) => {
            allSubFeatures.push(subFeature.name);
        });
    });

    const updateFeaturesByDomain = (domain) => {
        setSubFeatures(
            features
                .find((feature) => feature.domain.name === domain)
                .domain.subFeatures.map((subFeature, index) => {
                if (index === 0) setQuestionfeature(subFeature.name);
                return subFeature.name;
            })
        );
    };

    const updateAnswer = (e, answerIndex, title) => {
        let flag = false;
        if (e.target.value === "" && title === "body") {
            flag = true;
            setAnswerError(true);
        } else if (title === "body") setAnswerError(false);
        if (
            e.target.value === "" &&
            title === "iceBreaker" &&
            questionsType === "basic" //Only Basic question validate if iceBreaker empty because other questions iceBreaker still empty.
        ) {
            setIceBreakerError(true);
            flag = true;
        } else setIceBreakerError(false);

        if (flag) {
            flag = false;
            return;
        }
        let newArr = [...answersState];
        let newArr2 = newArr.map((answer, index) => {
            let tempelement = {...answer};
            if (index === answerIndex) {
                if (title === "body") tempelement.body = e.target.value;
                if (title === "iceBreaker") tempelement.iceBreaker = e.target.value;
            }
            return tempelement;
        });
        setAnswersState(newArr2);
    };

    const updateCurrentbody = (e, value) => {
        if (e.target.value === "") {
            setQuestionError(true);
            return;
        }
        setQuestionError(false);
        if (value === "title") {
            SetquestionBody(e.target.value);
        }
    };

    const deleteAnswer = (answerIndex) => {
        if (answersState.length === 2) return;
        let newArr = answersState.filter((_, index) => {
            return index !== answerIndex;
        });
        setAnswersState(newArr);
    };
    const addAnswer = () => {
        if (questionsType === "swippable" && answersState.length === 2) return;
        let newId = "";
        newId =
            answersState[answersState.length - 1].id.length === 3
                ? (newId = String(
                    parseInt(answersState[answersState.length - 1].id) + 1
                ))
                : (newId = String(
                    parseInt(answersState[answersState.length - 1].id) + 100
                ));

        setAnswersState((prevState) => [
            ...prevState,
            {
                body: "Please enter answer",
                effects: [
                    {
                        feature: "Forgivingness",
                        value: 0.1,
                    },
                ],
                iceBreaker: "Please enter iceBreaker",
                id: newId,
                count: 0,
            },
        ]);
    };

    const addEffect = (answerIndex) => {
        let newArr = [...answersState];
        let newArr2 = newArr.map((element, index) => {
            if (index === answerIndex) {
                let tempelement = {...element};
                let tempEffects = [...element.effects];
                tempEffects.push({
                    feature: "Forgiveness",
                    value: 0.1,
                });
                tempelement.effects = tempEffects;
                return tempelement;
            }
            return element;
        });
        setAnswersState(newArr2);
    };

    const deleteEffect = (answerIndex, effectIndex) => {
        if (answersState[answerIndex].effects.length === 1) {
            return;
        }
        let newArr = [...answersState];
        let newArr2 = newArr.map((element, index) => {
            if (index === answerIndex) {
                let tempelement = {...element};
                let tempEffects = element.effects.filter((_, eindex) => {
                    return eindex !== effectIndex;
                });
                tempelement.effects = tempEffects;
                return tempelement;
            }
            return element;
        });
        setAnswersState(newArr2);
    };


    const updateFeature = (e, answerIndex, effectIndex, title) => {
        let newArr = [...answersState];
        let newArr2 = newArr.map((element, index) => {
            if (index === answerIndex) {
                let tempelement = {...element};
                let tempEffects = element.effects.map((effect, eindex) => {
                    if (effectIndex === eindex) {
                        let tempeffect = {...effect};
                        if (title === "feature") tempeffect.feature = e.target.value;
                        if (title === "value")
                            tempeffect.value = parseFloat(e.target.value);
                        return tempeffect;
                    }
                    return effect;
                });
                tempelement.effects = tempEffects;
                return tempelement;
            }
            return element;
        });
        setAnswersState(newArr2);
    };

    const updateDomain = (e) => {
        setQuestionDomain(e.target.value);
        updateFeaturesByDomain(e.target.value);
    };

    const updateQuestionFeature = (e) => {
        setQuestionfeature(e.target.value);
    };


    const fetchImage = (file) => {
        API.get("BlindChatAPIGatewayAPI", `/questions/${props.id}/image`, {}).then(
            (res) => {
                const form = createFormData(file, res.fields);
                const fileLength = file.size;
                fetch(res.url, {
                    method: "POST",
                    body: form,
                    headers: {
                        "Content-Length": fileLength,
                    },
                });
            }
        );
    };

    const questionAfterEdit = {
        body: questionBody,
        id: idRef.current,
        type: questionsType,
        domain: questionDomian,
        feature: questionFeature,
        answers: answersState,
        category: questionCategory
    };
    console.log('questionAfterEdit',questionAfterEdit)
    return (
        <div>
            {deleteQuestion && (
                <DeleteQuestion {...props} setDeleteQuestion={setDeleteQuestion}/>
            )}
            <CenteredColumnDiv>
                {!props.new && (
                    <>
                        <img
                            src={imageState}
                            alt={"png"}
                            style={{width: "70px", height: "70px"}}
                        />

                        <ExpandButton
                            onClick={() => {
                                openFileDialog(async (file) => {
                                    setFile(file);
                                    setImageState(URL.createObjectURL(file));
                                });
                            }}
                        >
                            Upload image
                        </ExpandButton>
                    </>
                )}
            </CenteredColumnDiv>
            <label style={{fontWeight: "bolder"}}>Question </label>

            <QuestionInput
                style={{width: "50%"}}
                type="text"
                key={questionBody}
                defaultValue={questionBody}
                onBlur={(e) => updateCurrentbody(e, "title")}
            ></QuestionInput>
            {questionError && <FormError type="Question"/>}

            <div>
                <label style={{fontWeight: "bolder"}}>Domain </label>
                <select
                    onChange={(e) => {
                        updateDomain(e);
                    }}
                    defaultValue={questionDomian}
                    key={questionDomian}
                    style={{
                        backgroundColor: "black",
                        marginRight: "50px",
                        color: "white",
                        borderRadius: "15px",
                        height: "30px",
                        width: "120px",
                    }}
                >
                    {features.map((feature) => {
                        return <option>{feature.domain.name}</option>;
                    })}
                </select>
                <label style={{fontWeight: "bolder", marginLeft: "50px"}}>
                    Feature
                </label>
                <select
                    onChange={(e) => {
                        updateQuestionFeature(e);
                    }}
                    defaultValue={questionFeature}
                    key={questionFeature}
                    style={{
                        backgroundColor: "black",
                        marginRight: "50px",
                        color: "white",
                        borderRadius: "15px",
                        height: "30px",
                        width: "120px",
                    }}
                >
                    {subFeatures.map((sub) => {
                        return <option>{sub}</option>;
                    })}
                </select>
                {
                    questionsType === 'game' &&
                    <>
                        <label style={{fontWeight: "bolder", marginLeft: "50px"}}>
                            Category
                        </label>
                        <select
                            onChange={(e) => {
                                setQuestionCategory(e.target.value);
                            }}
                            defaultValue={questionCategory}
                            key={questionCategory}
                            style={{
                                backgroundColor: "black",
                                marginRight: "50px",
                                color: "white",
                                borderRadius: "15px",
                                height: "30px",
                                width: "120px",
                            }}
                        >
                            <option>romance</option>
                            <option>future</option>
                            <option>dare</option>
                            <option>funny</option>
                        </select>
                    </>}
            </div>
            <h2
                style={{
                    color: "lightgray",
                    marginBottom: "15px",
                }}
            >
                Answers
            </h2>
            {answerError && <FormError type="Answer"/>}
            {iceBreakerError && <FormError type="iceBreaker"/>}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {answersState.map((answer, answerIndex) => {
                    return (
                        <div
                            style={{
                                paddingRight: "10px",
                                paddingLeft: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <h5 style={{margin: "0px"}}>Delete answer</h5>
                                <ExpandButton
                                    style={{width: "40px", height: "40px"}}
                                    onClick={() => deleteAnswer(answerIndex)}
                                >
                                    X
                                </ExpandButton>
                            </div>
                            <label>{answerIndex + 1}.</label>
                            <QuestionInput
                                style={{marginRight: "20px"}}
                                type="text"
                                key={answer.body}
                                defaultValue={answer.body}
                                onBlur={(e) => {
                                    updateAnswer(e, answerIndex, "body");
                                }}
                            ></QuestionInput>

                            <>
                                <h5 style={{color: "white", marginBottom: "-5px"}}>
                                    Ice Breaker-
                                </h5>

                                <QuestionInput
                                    type="text"
                                    defaultValue={answer.iceBreaker}
                                    key={answer.iceBreaker}
                                    onBlur={(e) => {
                                        updateAnswer(e, answerIndex, "iceBreaker");
                                    }}
                                    style={{
                                        color: "lightgray",
                                        fontSize: "13px",
                                        paddingRight: "10px",
                                        paddingLeft: "10px",
                                    }}
                                ></QuestionInput>
                            </>

                            <h5 style={{marginBottom: "5px", marginTop: "5px"}}>Effects</h5>
                            {answer.effects.map((effect, effectIndex) => {
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
                                                alignItems: "center",
                                            }}
                                        >
                                            <ExpandButton
                                                onClick={() => {
                                                    deleteEffect(answerIndex, effectIndex);
                                                }}
                                                style={{
                                                    borderRadius: "7px",
                                                    width: "5px",
                                                    height: "5px",
                                                    fontSize: "10px",
                                                    lineHeight: "1px",
                                                    paddingLeft: "4px",
                                                }}
                                            >
                                                X
                                            </ExpandButton>
                                            <select
                                                onChange={(e) => {
                                                    updateFeature(e, answerIndex, effectIndex, "feature");
                                                }}
                                                defaultValue={effect.feature}
                                                key={effect.feature}
                                                style={{
                                                    backgroundColor: "black",
                                                    color: "white",
                                                    borderRadius: "15px",
                                                    height: "25px",
                                                    marginRight: "20px",
                                                    width: "100px",
                                                }}
                                            >
                                                {allSubFeatures.map((element) => {
                                                    return <option>{element}</option>;
                                                })}
                                            </select>
                                            <QuestionInput
                                                style={{
                                                    width: "50px",
                                                    margin: "0",
                                                }}
                                                step="0.05"
                                                min="0.1"
                                                max="1"
                                                type="range"
                                                value={effect.value}
                                                // key={effect.value}
                                                onChange={(e) => {
                                                    updateFeature(e, answerIndex, effectIndex, "value");
                                                }}
                                            ></QuestionInput>
                                            <p style={{minWidth: "30px"}}>{effect.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <h6 style={{margin: "0px", paddingTop: "10px"}}>Add effect</h6>
                            <ExpandButton
                                style={{
                                    height: "30px",
                                    width: "30px",
                                    padding: "0",
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
                    <h6 style={{margin: "0px"}}>Add answer</h6>
                    <ExpandButton
                        onClick={() => addAnswer()}
                        style={{height: "40px", width: "40px"}}
                    >
                        +
                    </ExpandButton>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                    alignItems: "flex-end",
                }}
            >
                <ExpandButton
                    disabled={questionError || answerError || iceBreakerError}
                    onClick={ async () => {
                        if (!props.new) {
                            await dispatch(putQuestionfunc(questionAfterEdit));
                            file && fetchImage(file);
                        } else {
                            await dispatch(addQuestionfunc(questionAfterEdit));
                        }
                        await dispatch(getQuestionListByType(questionsType));
                        props.togleEdit && props.togleEdit();
                    }}
                >
                    Save question
                </ExpandButton>
                {!props.new && (
                    <ExpandButton
                        onClick={() => {
                            setDeleteQuestion(true);
                        }}
                    >
                        Delete question
                    </ExpandButton>
                )}
            </div>
        </div>
    );
};
