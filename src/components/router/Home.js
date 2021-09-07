import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Questions from "../main/Questions";
import Stats from "../main/Stats";
import styled from "styled-components";
import MenuButton from "../styled/MenuButton";
import { useHistory } from "react-router";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authSlicer, { signOut } from "../../stores/slices/authSlicer";
import useCurrentTab from "../../customHooks/useCurrentTab";

const MenuContainer = styled.div`
  width: 20vw;
  min-width: 20vw;
  max-width: 20vw;

  height: 100%;
  border-right: 1px solid white;
`;

export default () => {
  const dispatch = useDispatch();
  const username = useSelector(({ auth }) => auth.username);
  const [activeUser, setActiveUser] = useState("");
  const currentTab = useCurrentTab();

  useEffect(() => {
    if (username == "346383f4-d451-4af8-b6fa-24bdb1160cff")
      setActiveUser("Ben");
  }, [username]);

  const history = useHistory();
  return (
    <div style={{ position: "relative" }}>
      <h3 className={"name"}>Hi, {activeUser}</h3>
      <div style={{ display: "flex", flexDirections: "row" }}>
        <MenuContainer>
          <MenuButton
            className={currentTab === "stats" ? "active" : ""}
            onClick={() => history.push("/home/stats")}
          >
            Stats
          </MenuButton>
          <MenuButton
            className={currentTab === "questions" ? "active" : ""}
            onClick={() => history.push("/home/questions")}
          >
            Questions
          </MenuButton>
        </MenuContainer>
        <div style={{ paddingLeft: "100px" }}>
          <Switch>
            <Route exact path="/home">
              <Redirect to={"/home/stats"} />
            </Route>
            <Route path="/home/stats">
              <Stats />
            </Route>
            <Route path="/home/questions">
              <Questions />
            </Route>
          </Switch>
        </div>
      </div>
      <button
        className={"button_signout"}
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Sign out
      </button>
    </div>
  );
};
