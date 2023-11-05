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

const CreditScoreDistribution = ({ userData }) => {
  // Assume userData is an array of user objects

  // Transform user data to fit the chart
  const creditScoreData = userData.reduce((acc, user) => {
    // Define credit score ranges
    const ranges = ["<600", "600-649", "650-699", "700-749", ">750"];
    // Find the range the user's score belongs to
    const score = user.creditScore;
    let range =
      score >= 750
        ? ">750"
        : score >= 700
        ? "700-749"
        : score >= 650
        ? "650-699"
        : score >= 600
        ? "600-649"
        : "<600";

    // Increment the count for the range
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {});

  // Convert to array
  const data = Object.keys(creditScoreData).map((range) => ({
    range,
    users: creditScoreData[range],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={userData.map((user) => ({
          name: user.firstName,
          creditScore: user.creditScore,
        }))}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label value="User" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Credit Score" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="creditScore" fill="#8884d8" name="Credit Score" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CreditScoreDistribution;
