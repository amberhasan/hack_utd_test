import React, { useState, useEffect } from "react";
import "./App.css";
import "./MonthlyDebtComponent.css"; // Make sure the path is correct
import "./HomeFinancesComponent.css"; // Make sure the path is correct
import "./PersonalInfoComponent.css"; // Make sure the path is correct
import "./UserIncomeCreditScore.css"; // Make sure the path is correct
import PersonalInfoComponent from "./PersonalInfoComponent"; // Adjust the path as necessary
import MonthlyDebtComponent from "./MonthlyDebtComponent";
import HomeFinancesComponent from "./HomeFinancesComponent";
import UserIncomeCreditScore from "./UserIncomeCreditScore";

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

        <UserIncomeCreditScore
          formData={formData}
          handleChange={handleChange}
        />

        <MonthlyDebtComponent
          formData={formData} // Ensure formData has the correct structure
          handleChange={handleChange}
        />
        <HomeFinancesComponent
          formData={formData}
          handleChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
