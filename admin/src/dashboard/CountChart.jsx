import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const CustomTooltip = ({ active, payload, label, hint }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-red bg-opacity-45 p-2 rounded-md max-w-48">
        <p className="text-xl font-semibold text-white">
          {hint === "view"
            ? "Total Number of View"
            : "Total Number of News Added"}
        </p>
        <p className="text-white font-semibold">{`${label} : ${payload[0].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="text-white">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={11}
      >
        {payload.value}
      </text>
    </g>
  );
};
const CountChart = ({ data, hint = "count" }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={<CustomizedAxisTick />} height={60} />
        <YAxis />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip hint={hint} />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CountChart;
