import {fetchUserDetailsAction, signInAction, signUpAction} from "../../../stores/slices/authSlicer";
import {Auth} from "aws-amplify";
import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {useSelector} from "react-redux";
import logo from "../../../logo.svg";

const Button = styled.button`
  font-size: large;
  padding: 10px;
  margin: 20px;
  border-radius: 20px;
  background-image: linear-gradient(#179FA6, #F46C96);
  &:hover {
    background-image: linear-gradient(#116e72, #79334e);
  }
`;
const Div = styled.div`
display: flex;
flex-wrap: nowrap;
;`
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
             <img src={logo} alt="Logo" className={'App-logo'}/>
             <Div>
            <Button onClick={()=>{
                dispatch(signUpAction({
                    email:"belson1988@gmail.com",
                    password:"1234567"
                }))
            }}>Sign Up</Button>
            <Button onClick={()=>{
                dispatch(signInAction({
                    email:"belson1988@gmail.com",
                    password:"1234567"
                }))
            }}>Sign In</Button>
            </Div>
        </header>
    </div>
}