import React from "react";
import "./MonthlyDebtComponent.css"; // Ensure you link to the correct CSS file.

const MonthlyDebtComponent = ({ formData, handleChange }) => {
  return (
    <div className="debt-container">
      <div className="input-group">
        <label htmlFor="carPayment" className="input-label">
          🚗 Car Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="carPayment"
          name="carPayment"
          placeholder="e.g., 300"
          value={formData.carPayment}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="studentLoanPayment" className="input-label">
          🎓 Student Loan Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="studentLoanPayment"
          name="studentLoanPayment"
          placeholder="e.g., 150"
          value={formData.studentLoanPayment}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="creditCardPayment" className="input-label">
          💳 Credit Card Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="creditCardPayment"
          name="creditCardPayment"
          placeholder="e.g., 200"
          value={formData.creditCardPayment}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default MonthlyDebtComponent;
