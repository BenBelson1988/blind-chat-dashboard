import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Questions from '../sliced/main/Questions'
import styled from 'styled-components';
import MenuButton from "../styled/MenuButton";
import {useHistory} from "react-router";

const MenuContainer = styled.div`
    width:20vw;
    min-width:20vw;
    max-width:20vw;
    
    height:100%;
    border-right:1px solid white;
    
`;


export default () => {
    const history = useHistory()
    return <div style={{display:'flex',flexDirections:'row'}}>
        <MenuContainer>
            <MenuButton onClick={()=>history.push('/home/stats')}>Stats</MenuButton>
            <MenuButton onClick={()=>history.push('/home/questions')}>Questions</MenuButton>
        </MenuContainer>
        <div className={'main'}>
            <Switch >
                <Route exact path="/home">
                    <Redirect to={'/home/stats'}/>
                </Route>
                <Route path="/home/stats">
                    <div style={{color:"white",fontSize:20}}>stats</div>
                </Route>
                <Route path="/home/questions">
                    <Questions/>
                </Route>
            </Switch>
        </div>
    </div>
}