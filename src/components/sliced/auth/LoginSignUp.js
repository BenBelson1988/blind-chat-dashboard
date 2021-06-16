import {fetchUserDetailsAction, signInAction} from "../../../stores/slices/authSlicer";
import {Auth} from "aws-amplify";
import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {useSelector} from "react-redux";

const Button = styled.button`
  padding: 10px;
`;

function checkUser() {
    Auth.currentAuthenticatedUser()
        .then(user => console.log({ user }))
        .catch(err => console.log(err));
}

function signOut() {
    Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

export default ()=>{
    const dispatch = useDispatch();
    const [userId] = useSelector(({auth})=>{
        return [auth.attributes?.sub]
    })

    useEffect(()=>{
        if (userId){
            dispatch(fetchUserDetailsAction())
        }
    },[userId])

    return <div className="App">
        <header className="App-header">
            <Button onClick={()=>{
                dispatch(signInAction({
                    username:'+972525420114',//'fd7b46e5-0ff0-42c7-be8b-e984c0c6c90b',
                    password:'1234567',
                }))
            }}>Sign In</Button>
        </header>
    </div>
}