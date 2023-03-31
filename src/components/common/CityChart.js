import { StatsDiv } from "../styled/Divs";
import { StatsH2 } from "../styled/Heading";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { FullCityListButton } from "../styled/Buttons";
import PopUp from "../styled/PopUp";
import FullCityList from "./FullCityList";

const colors = ["#116e72", "#79334e"];
const amountOffilter = 20;

export default (props) => {
  const [expandAllCities, setExpandAllCities] = useState(false);
  const data = Object.entries(props.city).map((e, i) => ({
    City: e[0].toString(),
    "The amount of users": e[1],
  }));

  let topTwentyData = data.slice(1, amountOffilter);

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
      <FullCityListButton onClick={() => setExpandAllCities(true)}>
        Full city list
      </FullCityListButton>
      {expandAllCities && (
        <PopUp width={"30vw"} height={"70vh"}>
          <FullCityList
            setExpandAllCities={setExpandAllCities}
            city={props.city}
          />
        </PopUp>
      )}
      <StatsH2>Blind-Chat {amountOffilter} most used cities</StatsH2>
      <ResponsiveContainer width={1250} height={450}>
        <BarChart
          data={topTwentyData}
          barGap={1}
          margin={{ bottom: 50, top: 50 }}
        >
          <Bar
            dataKey="The amount of users"
            fill="white"
            barSize={20}
            label={{ position: "top", fontWeight: "Bold" }}
            animationDuration={2000}
          >
            {topTwentyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 2]} />
            ))}
          </Bar>
          <YAxis />
          <XAxis
            dataKey="City"
            fontSize={12}
            fontWeight="Bolder"
            angle={35}
            interval={0}
            style={{ fill: "#c9c9c9" }}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </StatsDiv>
  );
};
