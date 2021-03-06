import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Amplify, { Auth, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

const initialState = {
  username: null,
  password: null,
  userDataKey: null,
};
export const signInAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const user = await Auth.signIn({
        username: email, //'fd7b46e5-0ff0-42c7-be8b-e984c0c6c90b', // Required, the username
        password, // '1234567', // Optional, the password
        // ['52'], // Optional, an array of key-value pairs which can contain any key and will be passed to your Lambda trigger as-is.
      });
      return user;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
);

export const signUpAction = createAsyncThunk(
  "auth/signup",
  async ({ email, password }) => {
    try {
      const user = await Auth.signUp({
        username: email, // Required, the username
        password, // Optional, the password
        // ['52'], // Optional, an array of key-value pairs which can contain any key and will be passed to your Lambda trigger as-is.
      });
      return user;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut() {
      Auth.signOut();
      return initialState;
    },
    setActiveUser(state, { payload }) {
      const username = payload["cognito:username"];
      Object.assign(state, { ...payload, username });
    },
  },
  extraReducers: {
    [signInAction.fulfilled]: (state, { payload }) => {
      Object.assign(state, payload);
    },
    [signUpAction.fulfilled]: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { signOut, setActiveUser } = authSlicer.actions;
export default authSlicer.reducer;
