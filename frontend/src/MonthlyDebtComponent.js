import React from "react";

const MonthlyDebtComponent = ({ formData, handleChange }) => {
  return (
    <div>
      <input
        type="number"
        name="carPayment"
        placeholder="Monthly Car Payment"
        value={formData.carPayment}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="studentLoanPayment"
        placeholder="Monthly Student Loan Payment"
        value={formData.studentLoanPayment}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="creditCardPayment"
        placeholder="Monthly Credit Card Payment"
        value={formData.creditCardPayment}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default MonthlyDebtComponent;
