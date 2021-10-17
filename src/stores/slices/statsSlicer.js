import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "@aws-amplify/api";

const initialState = {
  facets: {},
  facetsStats: {},
};

export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (dynamcially) => {
    try {
      if (!dynamcially) dynamcially = "";
      else dynamcially = "?query=" + dynamcially;
      const stats = await API.get(
        "BlindChatAPIGatewayAPI",
        "/users/stats" + dynamcially,
        {}
      );
      return { stats };
    } catch (err) {
      console.log(err);
    }
  }
);

export const StatsSlicer = createSlice({
  name: "stats",
  initialState,
  extraReducers: {
    [fetchStats.fulfilled]: (state, { payload: stats }) => {
      state.facets = stats.stats.facets;
      state.facetsStats = stats.stats.facetsStats;
    },
  },
});

export const {} = StatsSlicer.actions;
export default StatsSlicer.reducer;
