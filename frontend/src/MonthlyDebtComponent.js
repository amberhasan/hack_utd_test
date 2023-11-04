import React from "react";

const MonthlyDebtComponent = ({ monthlyDebtData, handleChange }) => {
  return (
    <div>
      <input
        type="number"
        name="carPayment"
        placeholder="Monthly Car Payment"
        value={monthlyDebtData.carPayment}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="studentLoanPayment"
        placeholder="Monthly Student Loan Payment"
        value={monthlyDebtData.studentLoanPayment}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="creditCardPayment"
        placeholder="Monthly Credit Card Payment"
        value={monthlyDebtData.creditCardPayment}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default MonthlyDebtComponent;
