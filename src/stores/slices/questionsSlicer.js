import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  addQuestion,
  deleteQuestion,
} from "../graphqloperations/queries/AddDeleteQuestion";
import {
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
          getQuestionsByType: { items: data },
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
  async (ref) => {
    try {
      const input = ref;
      const { id, body, type, domain, feature, answers } = ref;
      API.graphql(graphqlOperation(putQuestion, { input }));
      return { id, body, type, domain };
    } catch (err) {
      console.log(err);
    }
  }
);

export const addQuestionfunc = createAsyncThunk(
  "questions/addQuestion",
  async (ref) => {
    try {
      const input = ref;
      const { id, body, type, domain, feature, answers } = ref;
      API.graphql(graphqlOperation(addQuestion, { input }));
      return { id, body, type, domain, feature, answers };
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteQuestionfunc = createAsyncThunk(
  "questions/deleteQuestion",
  async (id) => {
    try {
      API.graphql(graphqlOperation(deleteQuestion, { id }));
      return { id };
    } catch (err) {
      console.log(err);
    }
  }
);

export const questionsSlicer = createSlice({
  name: "questions",
  initialState,
  extraReducers: {
    // [putQuestionfunc.fulfilled]: (state, { payload: { id, body, type } }) => {
    //   debugger;
    //   state[type].forEach((element) => {
    //     if (element.id === id) {
    //       element.body = body;
    //     }
    //   });
    // },

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
