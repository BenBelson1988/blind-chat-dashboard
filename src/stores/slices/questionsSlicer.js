import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { addQuestion } from "../graphqloperations/queries/AddDeleteQuestion";
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
//{ body: "", domain: "", id: "", image: "", answers: [] }

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
  async (ref) => {
    try {
      const input = ref;
      const { id, body, type, domain, feature, answers } = ref;
      debugger;
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
      debugger;
      API.graphql(graphqlOperation(addQuestion, { input }));
      return { id, body, type, domain, feature, answers };
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
