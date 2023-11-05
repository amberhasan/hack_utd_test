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
          name="monthlyIncome"
          placeholder="💸 Monthly Income"
          value={formData.monthlyIncome}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default UserIncomeCreditScore;
