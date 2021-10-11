import { useSelector } from "react-redux";
import AgeChart from "../common/AgeChart";
import GenderChart from "../common/GenderChart";
import { ColumnDiv, StatsContainer } from "../styled/Divs";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import { Middl1H1 } from "../styled/Heading";
import InterestsChart from "../common/InterestsChart";
import Users from "../common/Users";

export default () => {
  const facets = useSelector(({ stats }) => {
    return stats.facets;
  });
  const facetsStats = useSelector(({ stats }) => {
    return stats.facetsStats;
  });
  console.log("facets", facets);
  // console.log("facetsStats", facetsStats);
  const loading = Object.keys(facets).length === 0;

  return (
    <ColumnDiv>
      <Middl1H1>Blind-chat Statistics</Middl1H1>
      {loading && <CustomLoader title="Fecthing statistics" />}
      {!loading && <Users Users={facets.status} />}
      <StatsContainer>
        {!loading && <GenderChart Gender={facets.gender} />}
        {!loading && <AgeChart Age={facets.age} />}
      </StatsContainer>
      <StatsContainer>
        {!loading && <InterestsChart Interests={facets.interests} />}
      </StatsContainer>
    </ColumnDiv>
  );
};
