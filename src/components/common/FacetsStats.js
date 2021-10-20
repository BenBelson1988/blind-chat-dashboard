import { ActiveusersDiv, FacetsStatsDiv } from "../styled/Divs";
import { H4Blue, H4Pink } from "../styled/Heading";

export default (props) => {
  const agedata = Object.entries(props.facetsStats.age).map((e) => ({
    AgeStat: e[0],
    value: e[1],
  }));
  const matchdata = Object.entries(props.facetsStats.matchCount).map((e) => ({
    AgeStat: e[0],
    value: e[1],
  }));

  return (
    <>
      <FacetsStatsDiv>
        <H4Blue>Age stats</H4Blue>
        <ActiveusersDiv style={{ marginBottom: "15px" }}>
          {agedata.map((ages) => {
            if (ages.AgeStat === "sum") return;
            return (
              <H4Blue>
                {ages.AgeStat.toUpperCase()} age: {ages.value}
              </H4Blue>
            );
          })}
        </ActiveusersDiv>
      </FacetsStatsDiv>
      <FacetsStatsDiv>
        <H4Pink>Match stats</H4Pink>
        <ActiveusersDiv style={{ marginBottom: "15px" }}>
          {matchdata.map((ages) => {
            return (
              <H4Pink>
                {ages.AgeStat.toUpperCase()} match: {ages.value}
              </H4Pink>
            );
          })}
        </ActiveusersDiv>
      </FacetsStatsDiv>
    </>
  );
};
