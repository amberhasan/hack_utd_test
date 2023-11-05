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
        <input
          type="text"
          name="grossMonthlyIncome"
          placeholder="💸 Monthly Income"
          value={formData.grossMonthlyIncome}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default UserIncomeCreditScore;
