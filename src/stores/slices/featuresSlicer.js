import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "@aws-amplify/api";
const initialState = {
  features: [],
  isLoading: false,
};

export const fetchFeatures = createAsyncThunk(
  "features/fetchFeatures",
  async () => {
    try {
      const features = await API.get(
        "BlindChatAPIGatewayAPI",
        "/static/features",
        {}
      );
      return features;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const updateInterests = createAsyncThunk(
//   "interests/updateInterests",
//   async (interests) => {
//     try {
//       API.post("BlindChatAPIGatewayAPI", "/static/interests", {
//         body: { interest: interests },
//       });
//       return interests;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

export const FeaturesSlicer = createSlice({
  name: "features",
  initialState,
  extraReducers: {
    [fetchFeatures.fulfilled]: (state, { payload: features }) => {
      state["features"] = features;
      state["isLoading"] = false;
    },
    [fetchFeatures.pending]: (state) => {
      state["isLoading"] = true;
    },
    // [updateInterests.fulfilled]: (state, { payload: domians }) => {
    //   state["domians"] = domians;
    // },
  },
});

export const {} = FeaturesSlicer.actions;
export default FeaturesSlicer.reducer;
