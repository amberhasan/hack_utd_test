import React, { useState, useEffect } from "react";
import "./App.css";
import PersonalInfoComponent from "./PersonalInfoComponent"; // Adjust the path as necessary

function App() {
  // State hooks for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    creditScore: "",
    monthlyIncome: "",
    carPayment: "",
    studentLoanPayment: "",
    creditCardPayment: "",
    homeValue: "",
    downPayment: "",
    mortgagePayment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const creditScore = parseInt(formData.creditScore);
    const homeValue = parseFloat(formData.homeValue);
    const downPayment = parseFloat(formData.downPayment);
    const monthlyIncome = parseFloat(formData.monthlyIncome);
    const carPayment = parseFloat(formData.carPayment);
    const studentLoanPayment = parseFloat(formData.studentLoanPayment);
    const creditCardPayment = parseFloat(formData.creditCardPayment);
    const mortgagePayment = parseFloat(formData.mortgagePayment);

    const ltv = ((homeValue - downPayment) / homeValue) * 100;
    const dti =
      ((carPayment + studentLoanPayment + mortgagePayment + creditCardPayment) /
        monthlyIncome) *
      100;
    const fedti = (mortgagePayment / monthlyIncome) * 100;

    if (creditScore < 640) {
      alert("Credit score must be 640 or higher.");
      return;
    }

    if (ltv >= 80) {
      alert("LTV must be under 80%.");
      return;
    }

    if (dti >= 36) {
      alert("DTI must be under 36%.");
      return;
    }

    if (fedti >= 28) {
      alert("FEDTI must be under 28%.");
      return;
    }

    // If all validations pass
    alert("You are approved!");
  };

  // Render the form
  return (
    <div className="App">
      <h1>Home Buying Readiness Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <PersonalInfoComponent />

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
          {formData.creditScore}
        </label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
