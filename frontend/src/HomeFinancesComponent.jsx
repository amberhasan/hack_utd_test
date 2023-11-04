// HomeFinancesComponent.jsx
import React from "react";
import "./HomeFinancesComponent.css";

const HomeFinancesComponent = ({ formData, handleChange }) => {
  return (
    <div className="home-finances-container">
      <div className="input-group">
        <label htmlFor="homeValue" className="input-label">
          🏠 Home Appraised Value
        </label>
        <input
          className="input-field"
          type="number"
          id="homeValue"
          name="homeValue"
          placeholder="e.g., 300000"
          value={formData.homeValue}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="downPayment" className="input-label">
          💰 Down Payment
        </label>
        <input
          className="input-field"
          type="number"
          id="downPayment"
          name="downPayment"
          placeholder="e.g., 60000"
          value={formData.downPayment}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default HomeFinancesComponent;
