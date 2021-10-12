import { useSelector } from "react-redux";
import AgeChart from "../common/AgeChart";
import MatchCount from "../common/MatchCount";
import GenderChart from "../common/GenderChart";
import { FixedUpLeftDiv, StatsContainer, StatsHolder } from "../styled/Divs";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import { Middl1H1 } from "../styled/Heading";
import InterestsChart from "../common/InterestsChart";
import Users from "../common/Users";
import FacetsStats from "../common/FacetsStats";
import StatsFilter from "../common/StatsFilter";

export default () => {
  const facets = useSelector(({ stats }) => {
    return stats.facets;
  });
  const facetsStats = useSelector(({ stats }) => {
    return stats.facetsStats;
  });
  console.log("facetsStats", facetsStats);
  const loading = Object.keys(facets).length === 0;

  return (
    <StatsHolder>
      <Middl1H1>Blind-chat Statistics</Middl1H1>

      {loading && <CustomLoader title="Fecthing statistics" />}
      {!loading && (
        <>
          <FixedUpLeftDiv>
            <StatsFilter />
          </FixedUpLeftDiv>
          <Users Users={facets.status} />
          <StatsContainer>
            <FacetsStats facetsStats={facetsStats} />
          </StatsContainer>
          <StatsContainer>
            <GenderChart Gender={facets.gender} />
            <AgeChart Age={facets.age} />
          </StatsContainer>
          <StatsContainer>
            <InterestsChart Interests={facets.interests} />
          </StatsContainer>
          <StatsContainer>
            <MatchCount MatchCount={facets.matchCount} />
          </StatsContainer>
        </>
      )}
    </StatsHolder>
  );
};
