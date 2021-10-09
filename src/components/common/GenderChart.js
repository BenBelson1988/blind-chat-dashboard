import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default (props) => {
  const data = [
    { name: props.Gender[0], value: props.Gender.Male },
    { name: props.Gender[1], value: props.Gender.Female },
  ];

  const COLORS = ["#f46c96", "#179fa6"];

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
        {x > cx
          ? `${"Female"} ${(percent * 100).toFixed(0)}%`
          : `${"Male"} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "40px" }}>Probability by gender</h2>
      <ResponsiveContainer width={500} height={300}>
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
    </div>
  );
};
