import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  interests: [
    "cats",
    "dogs",
    "smoke",
    "anime",
    "ben",
    "ido",
    "shir",
    "or",
    "jessica",
    "cats",
    "dogs",
    "smoke",
    "anime",
    "ben",
    "ido",
    "shir",
    "or",
    "jessica",
    "cats",
    "dogs",
    "smoke",
    "anime",
    "ben",
    "ido",
    "shir",
    "or",
    "jessica",
  ],
};

export const getInterests = createAsyncThunk(
  "interests/getInterests",
  async () => {
    try {
      const interests = {};
      // API call Apigateway
      //https://fcc2qksf1b.execute-api.us-east-1.amazonaws.com/prod/static/app-config
      return { interests };
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateInterests = createAsyncThunk(
  "interests/updateInterests",
  async (interests) => {
    try {
      const { interests } = interests;
      // API call post http
      return { interests };
    } catch (err) {
      console.log(err);
    }
    debugger;
  }
);

export const InterestsSlicer = createSlice({
  name: "interests",
  initialState,
  extraReducers: {
    [getInterests.fulfilled]: (state, { payload: { interests } }) => {
      state[interests] = interests;
    },
    [updateInterests.fulfilled]: (state, { payload: { interests } }) => {
      state[interests] = interests;
    },
  },
});

export const {} = InterestsSlicer.actions;
export default InterestsSlicer.reducer;
