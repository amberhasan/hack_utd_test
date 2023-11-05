import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const DataGraph = () => {
  const data = [
    { age: 25, canBuyHouse: 1 },
    { age: 30, canBuyHouse: 0 },
    { age: 35, canBuyHouse: 0 },
    { age: 40, canBuyHouse: 1 },
    { age: 45, canBuyHouse: 1 },
    // ... more data
  ];

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Age : ${label}`}</p>
          <p className="intro">{`Can Buy House : ${
            payload[0].value ? "Yes" : "No"
          }`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age">
          <Label value="Age" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis allowDecimals={false} domain={[0, 1]}>
          <Label value="Can Buy House" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="canBuyHouse" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DataGraph;
