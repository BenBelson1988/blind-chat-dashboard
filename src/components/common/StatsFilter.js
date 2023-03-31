import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchStats } from "../../stores/slices/statsSlicer";
import { FilterStatsDiv, FixedDiv, MapDiv } from "../styled/Divs";
import { H3StatsHeading, H4Blue, H4Pink, H5TopBottom } from "../styled/Heading";
import { DotsButtonInterests } from "../styled/Xbutton";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import GoogleMap from "./GoogleMap/GoogleMap";
import Space from "../styled/Space";
import CitySearch from "./CitySearch";

export default (props) => {
  console.log("stats", props);
  const history = useHistory(),
    dispatch = useDispatch(),
    [filterState, setFilterState] = useState({
      male: "",
      female: "",
      minRange: props.facetsStats.age.min,
      maxRange: props.facetsStats.age.max,
      map: "",
      city: "",
    });
  const [firstRender, setFirstRender] = useState(true),
    minMaxref = useRef({
      min: 0,
      max: 0,
    });

  const cityListRef = useRef();

  const [mapState, setMapState] = useState({
    radius: 20,
    lat: 32.109333,
    lng: 34.855499,
  });

  if (firstRender) {
    minMaxref.current = {
      min: props.facetsStats.age.min,
      max: props.facetsStats.age.max,
    };
    cityListRef.current = props.cityList;
  }

  const setRange = (min, max) => {
    if (filterState.minRange !== min || filterState.maxRange !== max) {
      setFilterState({
        ...filterState,
        minRange: min,
        maxRange: max,
      });
    } else return;
  };

  const localFecthStats = () => {
    let dynamciallyArr = [];
    let dynamicallyQuery = "";

    if (filterState.minRange !== minMaxref.current.min) {
      setFirstRender(false);
      //not good ask for shir, need to save min max only from the first stats payload.
      dynamciallyArr
        .push("age > " + parseInt(filterState.minRange - 1))
        .toString();
    }
    if (filterState.maxRange !== minMaxref.current.max) {
      setFirstRender(false);
      //not good ask for shir, need to save min max only from the first stats payload.
      dynamciallyArr.push(
        "age < " + (parseInt(filterState.maxRange) + 1).toString()
      );
    }

    if (filterState.city) {
      setFirstRender(false);
      dynamciallyArr.push("city:" + '"' + filterState.city + '"');
    }

    if (filterState.male === "✓") {
      setFirstRender(false);
      dynamciallyArr.push("gender: Male");
    }
    if (filterState.female === "✓") {
      setFirstRender(false);
      dynamciallyArr.push("gender: Female");
    }

    /////
    dynamicallyQuery = dynamciallyArr.map((query, index) => {
      if (index === 0) return query;
      else return " AND " + query;
    });
    let historyQuery = "";
    historyQuery = dynamciallyArr.map((query, index) => {
      if (index === 0)
        return query
          .replaceAll('"', "")
          .replaceAll(/\s+/g, "-")
          .replaceAll("'", "");
      else return "&" + query;
    });

    dynamicallyQuery = dynamicallyQuery.toString().replaceAll(",", "");

    if (filterState.map === "✓") {
      setFirstRender(false);
      dynamicallyQuery +=
        "&aroundRadius=" +
        mapState.radius +
        "&aroundLatLng=" +
        mapState.lat +
        ", " +
        mapState.lng;
      historyQuery +=
        "&aroundRadius=" +
        mapState.radius +
        "&aroundLatLng=" +
        mapState.lat +
        "_" +
        mapState.lng;
    }
    historyQuery = historyQuery
      .toString()
      .replaceAll(",", "")
      .replaceAll(" ", "");

    history.push({
      search: "?" + historyQuery,
    });

    // if (!firstRender) dispatch(fetchStats(dynamicallyQuery));
    if (firstRender){
      dispatch(fetchStats(dynamicallyQuery));
    }
     setFirstRender(false);
  };

  useEffect(() => {
    localFecthStats();

  }, [filterState,firstRender]);

  useEffect(() => {
    if (filterState.map === "✓") localFecthStats();
    else return;
  }, [mapState]);

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

  const locationHandler = () => {
    if (filterState.map) {
      setFilterState({ ...filterState, map: "" });
    } else setFilterState({ ...filterState, map: "✓" });
  };

  return (
    <FixedDiv>
      <H3StatsHeading>Stats Filters</H3StatsHeading>
      <CitySearch
        filterState={filterState}
        setFilterState={setFilterState}
        cityList={cityListRef.current}
      />
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
        min={minMaxref.current.min}
        max={minMaxref.current.max}
        onChange={({ min, max }) => {}}
      />
      <Space height="20" />
      <FilterStatsDiv>
        <DotsButtonInterests onClick={() => locationHandler()}>
          {filterState.map}
        </DotsButtonInterests>
        <H4Blue>Filter by location</H4Blue>
      </FilterStatsDiv>
      <GoogleMap setMapState={setMapState} />
    </FixedDiv>
  );
};
