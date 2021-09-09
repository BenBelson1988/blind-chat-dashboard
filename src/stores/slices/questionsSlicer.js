import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  getQuestions,
  getQuestionsByType,
  putQuestion,
} from "../graphqloperations/queries/getQuestions";

const initialState = {
  basic: [],
  traits: [],
  swippable: [],
  games: [],
};

export const getQuestionListByType = createAsyncThunk(
  "questions/getQuestions",
  async (type) => {
    try {
      const {
        data: {
          getQuestions: { items: data },
        },
      } = await API.graphql(graphqlOperation(getQuestionsByType, { type }));
      return { questions: data, type };
    } catch (err) {
      console.log(err);
    }
  }
);

export const putQuestionfunc = createAsyncThunk(
  "questions/putQuestion",
  async (id, answers, body, domain) => {
    try {
      API.graphql(graphqlOperation(putQuestion, { id, body, domain, answers }));
      return { id, answers, body, domain };
    } catch (err) {
      console.log(err);
    }
  }
);

export const questionsSlicer = createSlice({
  name: "questions",
  initialState,
  extraReducers: {
    /*
    [putQuestionfunc.fulfilled]: (
      state,
      { payload: { id, answers, body, type } }
    ) => {
      state[type][id];
    },*/

    [getQuestionListByType.fulfilled]: (
      state,
      { payload: { type, questions } }
    ) => {
      state[type] = questions;
    },
  },
});

export const {} = questionsSlicer.actions;
export default questionsSlicer.reducer;
