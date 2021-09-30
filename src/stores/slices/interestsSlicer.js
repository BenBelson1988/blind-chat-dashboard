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
  async (interests) => {
    try {
      const input = interests;
      // API call
      return { interests };
    } catch (err) {
      console.log(err);
    }
  }
);

export const InterestsSlicer = createSlice({
  name: "interests",
  initialState,
  extraReducers: {
    [getInterests.fulfilled]: (state, { payload: { interests } }) => {
      state[interests] = interests;
    },
  },
});

export const {} = InterestsSlicer.actions;
export default InterestsSlicer.reducer;
