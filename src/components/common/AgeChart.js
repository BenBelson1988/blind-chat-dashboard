import { StatsDiv } from "../styled/Divs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StatsH2 } from "../styled/Heading";

export default (props) => {
  const data = Object.entries(props.Age).map((e) => ({
    age: e[0],
    "Number of users per age": e[1],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            lineHeight: "20px",
            width: "200px",
            color: "#179fa6",
          }}
        >
          <p>{`Age ${label}`}</p>
          <p>{`There are ${payload[0].value} users`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <StatsDiv>
      <StatsH2>Active users per age</StatsH2>
      <ResponsiveContainer width={700} height={250}>
        <BarChart data={data} barGap={1}>
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="Number of users per age"
            fill={("#f46c96", "#179fa6")}
            animationDuration={2000}
          />
        </BarChart>
      </ResponsiveContainer>
    </StatsDiv>
  );
};
