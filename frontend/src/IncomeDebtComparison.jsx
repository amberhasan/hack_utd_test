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

const IncomeDebtComparison = ({ userData }) => {
  // Assume userData is an array of user objects

  // Transform user data to fit the chart
  const data = userData.map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    income: user.grossMonthlyIncome,
    totalDebt:
      user.monthlyCarPayment +
      user.monthlyStudentLoanPayment +
      user.monthlyMortgagePayment +
      user.monthlyCreditCardPayment,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={userData.map((user) => ({
          name: user.firstName,
          grossMonthlyIncome: user.grossMonthlyIncome,
          totalDebt:
            user.monthlyCarPayment +
            user.monthlyStudentLoanPayment +
            user.monthlyMortgagePayment +
            user.monthlyCreditCardPayment,
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
        <YAxis yAxisId="left" orientation="left">
          <Label value="Income ($)" angle={-90} position="insideLeft" />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label value="Debt ($)" angle={90} position="insideRight" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="grossMonthlyIncome"
          fill="#82ca9d"
          name="Gross Monthly Income"
        />
        <Bar
          yAxisId="right"
          dataKey="totalDebt"
          fill="#8884d8"
          name="Total Monthly Debt"
        />
        <text
          x={0}
          y={20}
          fontSize="20"
          textAnchor="left"
          dominantBaseline="hanging"
        >
          Income to Debt Comparison
        </text>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeDebtComparison;
