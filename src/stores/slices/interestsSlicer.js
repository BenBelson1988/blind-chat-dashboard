import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "@aws-amplify/api";
const initialState = {
  interests: ["test"],
};

export const fetchInterests = createAsyncThunk(
  "interests/fetchInterests",
  async () => {
    try {
      const { interest: interests } = await API.get(
        "BlindChatAPIGatewayAPI",
        "/static/interests",
        {}
      );
      debugger;
      return interests;
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
    [fetchInterests.fulfilled]: (state, { payload: interests }) => {
      state["interests"] = interests;
    },
    [updateInterests.fulfilled]: (state, { payload: interests }) => {
      state["interests"] = interests;
    },
  },
});

export const {} = InterestsSlicer.actions;
export default InterestsSlicer.reducer;
