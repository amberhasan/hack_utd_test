import React, { useState, useEffect } from "react";
import "./App.css";

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="creditScore"
          placeholder="Credit Score"
          value={formData.creditScore}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income (Gross)"
          value={formData.monthlyIncome}
          onChange={handleChange}
          required
        />
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
