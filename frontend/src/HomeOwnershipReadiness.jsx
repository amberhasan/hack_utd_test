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
  Label,
  Bar,
  BarChart,
} from "recharts";

const HomeOwnershipReadiness = ({ userData }) => {
  // Assume userData is an array of user objects

  // Transform user data to fit the chart
  const data = userData.map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    ratio: user.homeAppraisedValue / user.downPaymentAmount,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={userData.map((user) => ({
          name: user.firstName,
          canBuyHouse:
            user.creditScore >= 650 &&
            user.grossMonthlyIncome >=
              3 *
                (user.monthlyMortgagePayment +
                  user.monthlyCarPayment +
                  user.monthlyStudentLoanPayment +
                  user.monthlyCreditCardPayment),
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
        <YAxis allowDecimals={false} domain={[0, 1]}>
          <Label value="Can Buy House" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="canBuyHouse" fill="#8884d8" name="Can Buy House" />
        <text
          x={0}
          y={20}
          fontSize="20"
          textAnchor="left"
          dominantBaseline="hanging"
        >
          Home Ownership Readiness
        </text>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HomeOwnershipReadiness;
