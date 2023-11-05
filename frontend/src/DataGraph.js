import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DataGraph = () => {
  // This is your hardcoded data
  const data = [
    { age: 25, canBuyHouse: 1 },
    { age: 30, canBuyHouse: 0 },
    { age: 35, canBuyHouse: 0 },
    { age: 40, canBuyHouse: 1 },
    { age: 45, canBuyHouse: 1 },
    // ... more data
  ];

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis allowDecimals={false} domain={[0, 1]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="canBuyHouse" fill="#8884d8" />
    </BarChart>
  );
};

export default DataGraph;
