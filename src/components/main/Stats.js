import { useSelector } from "react-redux";
import AgeChart from "../common/AgeChart";
import MatchCount from "../common/MatchCount";
import GenderChart from "../common/GenderChart";
import { BlockDiv, RowDiv, StatsContainer, StatsHolder } from "../styled/Divs";
import CustomLoader from "../sliced/auth/common/CustomLoader";
import { H4Blue, Middl1H1 } from "../styled/Heading";
import InterestsChart from "../common/InterestsChart";
import Users from "../common/Users";
import FacetsStats from "../common/FacetsStats";
import StatsFilter from "../common/StatsFilter";
import { useEffect } from "react";
import ExpandButton from "../styled/ExpandButton";
import { useHistory } from "react-router";
import CityChart from "../common/CityChart";

export default () => {
  const history = useHistory();
  const facets = useSelector(({ stats }) => {
    return stats.facets;
  });
  const facetsStats = useSelector(({ stats }) => {
    return stats.facetsStats;
  });

  const statsCount = useSelector(({ stats }) => {
    return stats.count;
  });
  if (statsCount === 0) {
    return (
      <>
        <H4Blue>
          There are currently no active users in the filter request.
        </H4Blue>
        <ExpandButton
          onClick={() => {
            history.push("/");
          }}
        >
          Go back and try again
        </ExpandButton>
      </>
    );
  }
  const loading = Object.keys(facets).length === 0;

  return (
    <RowDiv>
      <BlockDiv>
        {!loading && <StatsFilter facetsStats={facetsStats} />}
      </BlockDiv>
      <StatsHolder>
        <Middl1H1>Blind-chat Statistics</Middl1H1>

        {loading && <CustomLoader title="Fecthing statistics" />}
        {!loading && (
          <>
            <Users Users={facets.status} />
            <StatsContainer>
              <FacetsStats facetsStats={facetsStats} />
            </StatsContainer>
            <StatsContainer clickable onClick={(e) => console.log("test")}>
              <CityChart city={facets.city} />
            </StatsContainer>
            <StatsContainer>
              {Object.keys(facets.gender).length === 2 && (
                <GenderChart Gender={facets.gender} />
              )}
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
    </RowDiv>
  );
};
