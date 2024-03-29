import React, {useRef} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Questions from "../main/Questions";
import Stats from "../main/Stats";
import styled from "styled-components";
import MenuButton from "../styled/MenuButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import useCurrentTab from "../../customHooks/useCurrentTab";
import InterestsList from "../main/InterestsList";
import { fetchInterests } from "../../stores/slices/interestsSlicer";
import { fetchStats } from "../../stores/slices/statsSlicer";
import { fetchFeatures } from "../../stores/slices/featuresSlicer";
import FeaturesList from "../main/FeaturesList";

const MenuContainer = styled.div`
  width: 13vw;
  min-width: 13vw;
  max-width: 13vw;
  height: 100%;
`;



export default () => {
  const dispatch = useDispatch();
  const currentTab = useCurrentTab();
  useEffect(() => {
    dispatch(fetchInterests());
    // dispatch(fetchStats());
    dispatch(fetchFeatures());
  }, []);

  const history = useHistory();
  return (
    <div style={{ position: "relative", marginTop: "10px" }}>
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
            onClick={() =>
              currentTab === "questions" ? {} : history.push("/home/questions")
            }
          >
            Questions
          </MenuButton>
          <MenuButton
            className={currentTab === "interests" ? "active" : ""}
            onClick={() => history.push("/home/interests")}
          >
            Interests
          </MenuButton>
          <MenuButton
            className={currentTab === "features" ? "active" : ""}
            onClick={() => history.push("/home/features")}
          >
            Features
          </MenuButton>
        </MenuContainer>
        <div style={{ width: "100%" }}>
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
            <Route path="/home/interests">
              <InterestsList />
            </Route>
            <Route path="/home/features">
              <FeaturesList />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
