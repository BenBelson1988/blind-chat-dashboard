import { StatsDiv } from "../styled/Divs";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { StatsH2 } from "../styled/Heading";

export default (props) => {
  const data = Object.entries(props.MatchCount).map((e) => ({
    "number of matches": e[0],
    "Number of users per match count": e[1],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            lineHeight: "30px",
            width: "200px",
            color: "#179fa6",
          }}
        >
          <p>{`${payload[0].value} users have ${label} Macthes`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <StatsDiv>
      <StatsH2>Number of macthes per users </StatsH2>
      <ResponsiveContainer width={700} height={250}>
        <BarChart data={data} barGap={1} margin={{ top: 50 }}>
          <XAxis dataKey="number of matches" fontWeight="Bold" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="Number of users per match count"
            fill={"#79334e"}
            animationDuration={2000}
            barSize={25}
          >
            <LabelList
              dataKey="Number of users per match count"
              fill={"white"}
              position={"top"}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </StatsDiv>
  );
};
