import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import useQueryParams from "../../customHooks/useQueryParams";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import Question from "./Question";
import styled from 'styled-components';

const StatsList = styled.div`
    
    span{
      margin:8px;
    }

`

export default () => {
    const queryParams = useQueryParams();
    const questionsType = useMemo(()=>{
        return queryParams.type;
    },[queryParams.type]);


    const questions = useSelector(({questions}) => {
        return questions[questionsType] || [];
    });
    const isLoading = useSelector(({questions}) => {
        return questions.isLoading;
    });

    const questionStats = useMemo(() => {
        return questions.reduce((acc, q) => ({...acc, [q.domain]: (acc[q.domain] || 0) + 1}), {})
    }, [questions])
    const questionLength = Object.keys(questions).length === 0;

    return (
        <>
            {isLoading && <CustomLoader title="Fecthing questions"/>}
            {!isLoading && (
                <h1
                    style={{
                        fontSize: "30px",
                        alignSelf: "center",
                    }}
                >
                    {questions.length} questions in type {questionsType}.
                </h1>
            )}
            <StatsList>{Object.entries(questionStats).map(([key, count]) => <span><b>{key}</b>:{count}</span>)}</StatsList>
            {!isLoading &&
                !questionLength &&
                questions.map((question, index) => {
                    return <Question index={index} {...question} questionsType={questionsType}/>;
                })}
        </>
    );
};
