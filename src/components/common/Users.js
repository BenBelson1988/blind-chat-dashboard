import { RowDiv, ActiveusersDiv } from "../styled/Divs";
import CountUp from "react-countup";
import { StatsH2 } from "../styled/Heading";

export default (props) => {
  return (
    <RowDiv style={{ justifyContent: "center" }}>
      <ActiveusersDiv>
        <StatsH2>
          Active Users: <CountUp end={props.Users.Active} duration={3} />
        </StatsH2>
      </ActiveusersDiv>
      <ActiveusersDiv>
        <StatsH2>
          Registering:
          <CountUp end={props.Users.Registering} duration={2} />
        </StatsH2>
      </ActiveusersDiv>
    </RowDiv>
  );
};
