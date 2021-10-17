import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchStats } from "../../stores/slices/statsSlicer";
import { FilterStatsDiv, FixedDiv } from "../styled/Divs";
import { H3StatsHeading, H4Blue, H4Pink, H5TopBottom } from "../styled/Heading";
import { DotsButtonInterests } from "../styled/Xbutton";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

export default (props) => {
  const history = useHistory(),
    dispatch = useDispatch(),
    [filterState, setFilterState] = useState({
      male: "",
      female: "",
      minRange: props.facetsStats.age.min,
      maxRange: props.facetsStats.age.max,
    });
  const [firstRender, setFirstRender] = useState(true),
    minMaxref = useRef({
      min: 0,
      max: 0,
    });
  if (firstRender)
    minMaxref.current = {
      min: props.facetsStats.age.min,
      max: props.facetsStats.age.max,
    };

  const setRange = (min, max) => {
    if (filterState.minRange !== min || filterState.maxRange !== max) {
      setFilterState({
        ...filterState,
        minRange: min,
        maxRange: max,
      });
    } else return;
  };

  useEffect(() => {
    let dynamciallyArr = [];

    if (filterState.minRange !== 21) {
      setFirstRender(false);
      //not good ask for shir, need to save min max only from the first stats payload.
      dynamciallyArr
        .push("age > " + parseInt(filterState.minRange - 1))
        .toString();
    }
    if (filterState.maxRange !== 46) {
      setFirstRender(false);
      //not good ask for shir, need to save min max only from the first stats payload.
      dynamciallyArr.push(
        "age < " + (parseInt(filterState.maxRange) + 1).toString()
      );
    }
    if (filterState.male === "✓") {
      setFirstRender(false);
      dynamciallyArr.push("gender: Male");
    }
    if (filterState.female === "✓") {
      setFirstRender(false);
      dynamciallyArr.push("gender: Female");
    }
    let dynamicallyQuery = "";
    dynamicallyQuery = dynamciallyArr.map((query, index) => {
      if (index === 0) return query;
      else return " AND " + query;
    });
    let historyQuery = "";
    historyQuery = dynamciallyArr.map((query, index) => {
      if (index === 0) return query;
      else return "&" + query;
    });
    dynamicallyQuery = dynamicallyQuery.toString().replaceAll(",", "");
    historyQuery = historyQuery
      .toString()
      .replaceAll(",", "")
      .replaceAll(" ", "");
    history.push({
      search: "?" + historyQuery,
    });

    if (!firstRender) dispatch(fetchStats(dynamicallyQuery));
    else setFirstRender(false);
  }, [filterState]);

  const menHandle = () => {
    if (filterState.male) {
      setFilterState({ ...filterState, male: "", female: "" });
    } else {
      setFilterState({ ...filterState, male: "✓", female: "" });
    }
  };
  const femaleHandle = () => {
    if (filterState.female) {
      setFilterState({ ...filterState, male: "", female: "" });
    } else setFilterState({ ...filterState, male: "", female: "✓" });
  };

  return (
    <FixedDiv>
      <H3StatsHeading>Filters</H3StatsHeading>
      <FilterStatsDiv>
        <DotsButtonInterests onClick={() => menHandle()}>
          {filterState.male}
        </DotsButtonInterests>
        <H4Blue>Male</H4Blue>
        <DotsButtonInterests onClick={() => femaleHandle()}>
          {filterState.female}
        </DotsButtonInterests>
        <H4Pink>Female</H4Pink>
      </FilterStatsDiv>
      <H5TopBottom>Age</H5TopBottom>
      <MultiRangeSlider
        setRange={setRange}
        min={minMaxref.current.min} //not good ask for shir, need to save min max only from the first stats payload.
        max={minMaxref.current.max} //not good ask for shir, need to save min max only from the first stats payload.
        onChange={({ min, max }) => {}}
      />
    </FixedDiv>
  );
};
