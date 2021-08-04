import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import LoginSignUp from "../sliced/auth/LoginSignUp";
import RouteGuard from "./RouteGuard";
import Home from "../sliced/auth/Home";
import React, {useEffect} from "react";
import {Hub} from "aws-amplify";
import {useSelector} from "react-redux";


export default ()=>{
    const {username} = useSelector(({auth})=>auth);
    const history = useHistory();
    useEffect(()=>{
        debugger
        if (username){
            history.push('/home')
        }
    },[username])

    // useEffect(() => {
    //     Hub.listen("auth", (data) => {
    //         const {payload} = data;
    //         console.log("A new auth event has happened: ", data);
    //         if (payload.event === "signIn") {
    //             console.log("a user has signed in!");
    //             console.log(payload.data);
    //         }
    //         if (payload.event === "signOut") {
    //             console.log("a user has signed out!");
    //         }
    //     });
    // }, []);

    return <Switch>
        <Route exact path="/">
            <Redirect to="/home"/>
        </Route>
        <Route exact path="/auth">
            <LoginSignUp/>
        </Route>
        (
        <RouteGuard exact path="/home">
            <Home/>
        </RouteGuard>
        )
    </Switch>
}