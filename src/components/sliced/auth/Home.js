import React from 'react';
import {useDispatch} from "react-redux";
import {signout} from "../../../stores/slices/authSlicer";

export default () => {
  const dispatch = useDispatch()
  return <button onClick={()=>dispatch(signout())}>SIGN OUT</button>;
};
