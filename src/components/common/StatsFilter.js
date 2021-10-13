import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchStats } from "../../stores/slices/statsSlicer";
import { StatsDiv, FilterStatsDiv, FixedDiv } from "../styled/Divs";
import {
  H3StatsHeading,
  H4Blue,
  H4Pink,
  H5TopBottom,
  StatsH2,
} from "../styled/Heading";
import { DotsButtonInterests } from "../styled/Xbutton";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isGeneder, setGeneder] = useState({
    male: "",
    female: "",
  });
  const ageRef = useRef({
    min: props.facetsStats.age.min,
    max: props.facetsStats.age.max,
  });

  const setRange = (min, max) => {
    ageRef.current.min = min;
    ageRef.current.max = max;
    console.log(ageRef.current);
  };

  useEffect(() => {
    if (isGeneder.male === "✓") {
      dispatch(fetchStats("gender:Male"));
      history.push({
        search: "?gender=Male",
      });
    }
    if (isGeneder.female === "✓") {
      dispatch(fetchStats("gender:Female"));
      history.push({
        search: "?gender=Female",
      });
    }
  }, [isGeneder]);

  const menHandle = () => {
    if (isGeneder.male) {
      setGeneder({
        male: "",
        female: "",
      });
      dispatch(fetchStats());
      history.push();
    } else {
      setGeneder({
        male: "✓",
        female: "",
      });
    }
  };
  const femaleHandle = () => {
    if (isGeneder.female) {
      setGeneder({ male: "", female: "" });
      dispatch(fetchStats());
      history.push();
    } else setGeneder({ male: "", female: "✓" });
  };

  return (
    <FixedDiv>
      <H3StatsHeading>Filters</H3StatsHeading>
      <FilterStatsDiv>
        <DotsButtonInterests onClick={() => menHandle()}>
          {isGeneder.male}
        </DotsButtonInterests>
        <H4Blue>Male</H4Blue>
        <DotsButtonInterests onClick={() => femaleHandle()}>
          {isGeneder.female}
        </DotsButtonInterests>
        <H4Pink>Female</H4Pink>
      </FilterStatsDiv>
      <H5TopBottom>Age</H5TopBottom>
      <MultiRangeSlider
        min={props.facetsStats.age.min}
        max={props.facetsStats.age.max}
        onChange={({ min, max }) => setRange(min, max)}
      />
    </FixedDiv>
  );
};
