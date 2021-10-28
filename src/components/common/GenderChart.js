import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RowDiv, StatsDiv, MarkDiv } from "../styled/Divs";
import { H4Blue, H4Pink, StatsH2 } from "../styled/Heading";

export default (props) => {
  const data = [
    { name: props.Gender[0], value: props.Gender.Male },
    { name: props.Gender[1], value: props.Gender.Female },
  ];

  const COLORS = ["#179fa6", "#f46c96"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        style={{ fontSize: "20px" }}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {` ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <StatsDiv>
      <StatsH2>Distribution by gender</StatsH2>
      <div style={{ position: "absolute", top: "20%", left: "2%" }}>
        <RowDiv style={{ justifyContent: "flex-end" }}>
          <H4Blue>Male</H4Blue>
          <MarkDiv style={{ backgroundColor: "#179fa6" }}></MarkDiv>
        </RowDiv>
        <RowDiv style={{ justifyContent: "flex-end" }}>
          <H4Pink>Female</H4Pink>
          <MarkDiv style={{ backgroundColor: "#f46c96" }}></MarkDiv>
        </RowDiv>
      </div>
      <ResponsiveContainer width={500} height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </StatsDiv>
  );
};
