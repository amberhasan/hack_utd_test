// UserIncomeCreditScore.jsx
import React from "react";

const UserIncomeCreditScore = ({ formData, handleChange }) => {
  return (
    <div>
      <div>
        <label>
          Credit Score
          <input
            type="range"
            name="creditScore"
            min="300"
            max="850"
            value={formData.creditScore}
            onChange={handleChange}
          />
          {formData.creditScore}
        </label>
      </div>
      <div>
        <label>
          Monthly Income (Gross)
          <input
            type="range"
            name="monthlyIncome"
            min="0"
            max="100000"
            value={formData.monthlyIncome}
            onChange={handleChange}
          />
          {formData.monthlyIncome}
        </label>
      </div>
    </div>
  );
};

export default UserIncomeCreditScore;
