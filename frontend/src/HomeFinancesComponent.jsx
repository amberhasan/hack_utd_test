// HomeFinancesComponent.jsx
import React from "react";
import MonthlyDebtComponent from "./MonthlyDebtComponent";

const HomeFinancesComponent = ({ formData, handleChange }) => {
  return (
    <div>
      <MonthlyDebtComponent
        monthlyDebtData={formData}
        handleChange={handleChange}
      />
      <input
        type="number"
        name="homeValue"
        placeholder="Home Appraised Value"
        value={formData.homeValue}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="downPayment"
        placeholder="Down Payment"
        value={formData.downPayment}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default HomeFinancesComponent;
