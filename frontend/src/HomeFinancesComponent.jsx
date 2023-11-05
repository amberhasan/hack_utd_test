// HomeFinancesComponent.jsx
import React from "react";
import "./HomeFinancesComponent.css";

const HomeFinancesComponent = ({ formData, handleChange }) => {
  return (
    <div className="home-finances-container">
      <div className="input-group">
        <label htmlFor="homeAppraisedValue" className="input-label">
          🏠 Home Appraised Value
        </label>
        <input
          className="input-field"
          type="number"
          id="homeAppraisedValue"
          name="homeAppraisedValue"
          placeholder="e.g., 300000"
          value={formData.homeAppraisedValue}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="downPaymentAmount" className="input-label">
          💰 Down Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="downPaymentAmount"
          name="downPaymentAmount"
          placeholder="e.g., 60000"
          value={formData.downPaymentAmount}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default HomeFinancesComponent;
