import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "@aws-amplify/api";

const initialState = {
  facets: {},
  facetsStats: {},
  count: {},
};


export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (dynamically) => {
    try {
      const stats = await API.get(
        "BlindChatAPIGatewayAPI",
        "/users/stats" + dynamically,
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
      state.count = stats.stats.count;
    },
  },
});

export const {} = StatsSlicer.actions;
export default StatsSlicer.reducer;
