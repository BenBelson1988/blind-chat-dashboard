import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Route, Redirect, useLocation, useHistory} from "react-router-dom";

export default ({children,...props})=>{
    const {username} = useSelector(({auth})=>auth);

    return <Route {...props} >
        {username ? children : <Redirect to={"/auth"} />}
    </Route>
}