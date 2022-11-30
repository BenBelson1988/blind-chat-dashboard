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
  isLoading: false,
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
  async (input) => {
    try {
      const { id, body, type, domain, category } = input;
      debugger
      await API.graphql(graphqlOperation(putQuestion, { input }));
      return { id, body, type, domain,category };
    } catch (err) {
      console.log(err);
    }
  }
);

export const addQuestionfunc = createAsyncThunk(
  "questions/addQuestion",
  async (input) => {
    try {
      const { id, body, type, domain, feature, answers,category } = input;
      API.graphql(graphqlOperation(addQuestion, { input }));
      return { id, body, type, domain, feature, answers ,category};
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
    [getQuestionListByType.pending]: (state) => {
      state["isLoading"] = true;
    },

    [getQuestionListByType.fulfilled]: (
      state,
      { payload: { type, questions } }
    ) => {
      state["isLoading"] = false;
      state[type] = questions;
    },
  },
});

export const {} = questionsSlicer.actions;
export default questionsSlicer.reducer;
