import React, { useState, useEffect } from "react";
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
import calculateMortgage from "./calculateMortgage";
import MortgageDecisionLetter from "./MortgageDecisionLetter";

function App() {
  // State hooks for form inputs

  const [listings, setListings] = useState([]);

  //GET works
  useEffect(() => {
    console.log("Making request to server...");
    fetch("http://localhost:3001/listings")
      .then((res) => {
        console.log("Received response from server", res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);
        setListings(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    creditScore: 0,
    grossMonthlyIncome: 0,
    monthlyCarPayment: 0,
    monthlyStudentLoanPayment: 0,
    monthlyCreditCardPayment: 0,
    homeAppraisedValue: 0,
    downPaymentAmount: 0,
    monthlyMortgagePayment: 0,
  });

  const [mortgageDecision, setMortgageDecision] = useState({
    canBuyHouse: false,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ltv, dti, fedti, canBuyHouse, message } =
      calculateMortgage(formData);

    try {
      const response = await Axios.post(
        "http://localhost:3001/api/submitData",
        { ...formData, ltv, dti, fedti, canBuyHouse } // TODO - add to schema, Include the calculated values if needed for the backend
      );
      setMortgageDecision({
        canBuyHouse: response.data.canBuyHouse,
        message: response.data.message,
      });
      setCurrentStep(currentStep + 1); // Move to the mortgage decision step
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data");
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
            <div className="buttons-container">
              <button
                className="next-prev-buttons"
                type="button"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
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
            <div className="buttons-container">
              <button
                className="next-prev-buttons"
                type="button"
                onClick={prevStep}
              >
                Back
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <MortgageDecisionLetter
            canBuyHouse={mortgageDecision.canBuyHouse}
            message={mortgageDecision.message}
          />
        );

      default:
        return <div>Hello</div>;
    }
  };

  return (
    <div className="App">
      <h1>Home Buying Readiness Form</h1>
      <form onSubmit={handleSubmit} className="form">
        {renderStep()}
      </form>
    </div>
  );
}

export default App;
