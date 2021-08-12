import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {getQuestions, getQuestionsByType} from "../graphqloperations/queries/getQuestions";

const initialState = {
    basic:{},
    traits:{},
    swippable:{},
    games:{}
}

export const getQuestionListByType = createAsyncThunk(
    "auth/getQuestions",
    async (type) => {
        try {
            const {
                data: { getQuestions: data },
            } = await API.graphql(graphqlOperation(getQuestionsByType,{type}));
            return data;
        } catch (err) {
            console.log(err);
        }
    }
);

const questionsSlicer= createSlice({
    name: "questions",
    initialState,
    extraReducers: {
        [getQuestionListByType.fulfilled]: (state, { payload }) => {
            Object.assign(state, payload);
        },
    }
})

export const { } = questionsSlicer.actions;
export default questionsSlicer
