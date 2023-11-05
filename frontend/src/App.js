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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const email = formData.email;
    const age = parseInt(formData.age);
    const monthlyCarPayment = parseFloat(formData.carPayment);
    const monthlyStudentLoanPayment = parseFloat(formData.studentLoanPayment);
    const monthlyMortgagePayment = parseFloat(formData.mortgagePayment);
    const creditScore = parseInt(formData.creditScore);
    const grossMonthlyIncome = parseFloat(formData.monthlyIncome);
    const monthlyCreditCardPayment = parseFloat(formData.creditCardPayment);
    const homeAppraisedValue = parseFloat(formData.homeAppraisedValue);
    const downPaymentAmount = parseFloat(formData.downPaymentAmount);

    const ltv =
      ((homeAppraisedValue - downPaymentAmount) / downPaymentAmount) * 100;
    const dti =
      ((monthlyCarPayment +
        monthlyStudentLoanPayment +
        monthlyMortgagePayment +
        monthlyCreditCardPayment) /
        grossMonthlyIncome) *
      100;
    const fedti = (monthlyMortgagePayment / grossMonthlyIncome) * 100;
    const isApproved = creditScore >= 640 && ltv < 80 && dti < 36 && fedti < 28;

    try {
      const response = await Axios.post(
        "http://localhost:3001/api/submitData",
        formData
      ); // Updated URL
      if (response.status === 200) {
        alert(JSON.stringify(formData, null, 2));
      } else {
        alert("Error saving data");
      }
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
