import { useState, useEffect, useRef } from "react";
import { FullCityListButton } from "../styled/Buttons";
import {
  FeatureContainer,
  FeatureDescriptionDiv,
  RowWithWrap,
  ColumnFlexOne,
  RowDiv,
} from "../styled/Divs";
import * as H from "../styled/Heading";
import Space from "../styled/Space";

export default (props) => {
  const [expand, setExpand] = useState(false);
  const [expandText, setExpandText] = useState("Expand domain");
  const [activeSub, setActiveSub] = useState(0);
  const ref = useRef(null);
  const HandleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setExpand(false);
      setExpandText("Expand domain");
      setActiveSub(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", HandleClickOutside, true);
  });

  const expandFunc = () => {
    setExpand(!expand);
    setExpandText(
      expandText === "Expand domain" ? "Close domain" : "Expand domain"
    );
  };
  return (
    <FeatureContainer expand={expand} ref={ref}>
      <FullCityListButton onClick={() => expandFunc()}>
        {expandText}
      </FullCityListButton>
      <H.StatsH2>{props.name}</H.StatsH2>
      <H.FeatureH4>Description</H.FeatureH4>
      <FeatureDescriptionDiv>{props.description}</FeatureDescriptionDiv>
      <Space height={"10"} />
      {expand && (
        <RowDiv>
          <ColumnFlexOne>
            <H.FeatureH4>High</H.FeatureH4>
            <FeatureDescriptionDiv>{props.high}</FeatureDescriptionDiv>
          </ColumnFlexOne>
          <ColumnFlexOne>
            <H.FeatureH4>Low</H.FeatureH4>
            <FeatureDescriptionDiv>{props.low}</FeatureDescriptionDiv>
          </ColumnFlexOne>
        </RowDiv>
      )}
      <H.FeatureH4>Sub Features</H.FeatureH4>
      <RowWithWrap>
        {props.subFeatures.map((subF, index) => {
          return (
            <H.SubFHead
              active={activeSub === index && expand ? true : false}
              key={index}
              onClick={() => {
                setActiveSub(index);
              }}
            >
              {subF.name}
            </H.SubFHead>
          );
        })}
      </RowWithWrap>
      {expand && (
        <>
          <H.FeatureH4>
            {props.subFeatures[activeSub].name} description
          </H.FeatureH4>
          <FeatureDescriptionDiv>
            {props.subFeatures[activeSub].description}
          </FeatureDescriptionDiv>
          <Space height={10} />
          <H.FeatureH4>
            Similarity:
            {props.subFeatures[activeSub].similarity ? "true" : "false"}
          </H.FeatureH4>
        </>
      )}
    </FeatureContainer>
  );
};
