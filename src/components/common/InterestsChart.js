import { StatsDiv } from "../styled/Divs";
import { StatsH2 } from "../styled/Heading";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const colors = ["#116e72", "#79334e"];
export default (props) => {
  const data = Object.entries(props.Interests).map((e) => ({
    Interests: e[0].toString(),
    "The amount of interest": e[1],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            lineHeight: "35px",
            width: "200px",
            color: "#179fa6",
          }}
        >
          <p>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  /////////////
  return (
    <StatsDiv
      style={{
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <StatsH2>Interests by popularity</StatsH2>
      <ResponsiveContainer width={1250} height={400}>
        <BarChart data={data} barGap={1} margin={{ bottom: 50 }}>
          <YAxis />
          <XAxis
            dataKey="Interests"
            fontSize={15}
            fontWeight="Bold"
            angle={50}
            interval={0}
            fill="white"
          />
          <Bar
            dataKey="The amount of interest"
            fill="white"
            barSize={10}
            label={{ position: "top" }}
            animationDuration={2000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 2]} />
            ))}
          </Bar>
          <Tooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </StatsDiv>
  );
};
