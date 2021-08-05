import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Amplify, { Auth, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { me } from "../graphqloperations/queries/me";

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
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
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
    }
  }
);

export const fetchUserDetailsAction = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    try {
      const {
        data: { me: data },
      } = await API.graphql(graphqlOperation(me));
      return data;
      console.log(data);
    } catch (err) {
      console.log(err);
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
  },
  extraReducers: {
    [signInAction.fulfilled]: (state, { payload }) => {
      Object.assign(state, payload);
    },
    [signUpAction.fulfilled]: (state, { payload }) => {
      Object.assign(state, payload);
    },
    [fetchUserDetailsAction.fulfilled]: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { signOut } = authSlicer.actions;
export default authSlicer.reducer;
