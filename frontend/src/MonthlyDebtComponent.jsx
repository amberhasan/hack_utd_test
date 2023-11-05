import React from "react";
import "./MonthlyDebtComponent.css"; // Ensure you link to the correct CSS file.

const MonthlyDebtComponent = ({ formData, handleChange }) => {
  return (
    <div className="debt-container">
      <div className="input-group">
        <label htmlFor="monthlyCarPayment" className="input-label">
          🚗 Car Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="monthlyCarPayment"
          name="monthlyCarPayment"
          placeholder="e.g., 300"
          value={formData.carPayment}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="monthlyStudentLoanPayment" className="input-label">
          🎓 Student Loan Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="monthlyStudentLoanPayment"
          name="monthlyStudentLoanPayment"
          placeholder="e.g., 150"
          value={formData.monthlyStudentLoanPayment}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="monthlyCreditCardPayment" className="input-label">
          💳 Credit Card Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="monthlyCreditCardPayment"
          name="monthlyCreditCardPayment"
          placeholder="e.g., 200"
          value={formData.monthlyCreditCardPayment}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default MonthlyDebtComponent;
