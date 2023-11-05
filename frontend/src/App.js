import React, { useState } from "react";
import "./App.css";
import "./MonthlyDebtComponent.css";
import "./HomeFinancesComponent.css";
import "./PersonalInfoComponent.css";
import "./UserIncomeCreditScore.css";
import PersonalInfoComponent from "./PersonalInfoComponent";
import MonthlyDebtComponent from "./MonthlyDebtComponent";
import HomeFinancesComponent from "./HomeFinancesComponent";
import UserIncomeCreditScore from "./UserIncomeCreditScore";
import Axios from "axios";

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

  const handleSubmit = async (e) => {
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

    try {
      const response = await Axios.post("http://localhost:3001/home", formData);
      if (response.status === 200) {
        alert("Successful insert");
      } else {
        alert("Error inserting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error inserting data");
    }
  };

  // New state for tracking the current form step
  const [currentStep, setCurrentStep] = useState(1);

  // Total number of steps
  const totalSteps = 4;

  // Function to move to next form step
  const nextStep = (e) => {
    // Prevent default form action if the event object is provided
    if (e) e.preventDefault();

    if (currentStep >= totalSteps) {
      // You can handle the final submit here if you want
      handleSubmit(e); // Ensure that 'e' is passed if it's available
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to move to previous form step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Conditional rendering based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <PersonalInfoComponent
              formData={formData}
              handleChange={handleChange}
            />
            <UserIncomeCreditScore
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        );

      case 2:
        return (
          <div>
            <MonthlyDebtComponent
              formData={formData}
              handleChange={handleChange}
            />
            <HomeFinancesComponent
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Home Buying Readiness Form</h1>
      <form onSubmit={handleSubmit} className="form">
        {renderStep()}
        <div className="buttons-container">
          <button className="next-prev-buttons" onClick={prevStep}>
            &lt;
          </button>
          <button className="next-prev-buttons" onClick={nextStep}>
            &gt;
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
