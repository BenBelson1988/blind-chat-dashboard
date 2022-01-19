import { useState } from "react";
import { FullCityListButton } from "../styled/Buttons";
import {
  FeatureContainer,
  FeatureDescriptionDiv,
  RowWithWrap,
} from "../styled/Divs";
import * as H from "../styled/Heading";
import Space from "../styled/Space";

export default (props) => {
  const [expand, setExpand] = useState(false);
  const [expandText, setExpandText] = useState("Expand domain");

  const expandFunc = () => {
    setExpand(!expand);
    setExpandText(
      expandText === "Expand domain" ? "Close domain" : "Expand domain"
    );
  };
  return (
    <FeatureContainer onClick={expandFunc} expand={expand}>
      <FullCityListButton onClick={() => expandFunc()}>
        {expandText}
      </FullCityListButton>
      <H.StatsH2>{props.name}</H.StatsH2>
      <H.FeatureH4>Description</H.FeatureH4>
      <FeatureDescriptionDiv>{props.description}</FeatureDescriptionDiv>
      <Space height={"10"} />
      <H.FeatureH4>Sub Features</H.FeatureH4>
      <RowWithWrap>
        {props.subFeatures.map((subF) => {
          return <H.SubFHead>{subF.name}</H.SubFHead>;
        })}
      </RowWithWrap>
    </FeatureContainer>
  );
};
