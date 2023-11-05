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
import DataGraph from "./DataGraph";
import HomeOwnershipReadiness from "./HomeOwnershipReadiness";
import IncomeDebtComparison from "./IncomeDebtComparison";
import CreditScoreDistribution from "./CreditScoreDistribution";

function App() {
  const [activeSegment, setActiveSegment] = useState("form"); // 'form' or 'discover'

  const handleSegmentChange = (segment) => {
    setActiveSegment(segment);
  };

  const userData = [
    {
      id: "1",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      age: 28,
      monthlyCarPayment: 300,
      monthlyStudentLoanPayment: 200,
      monthlyMortgagePayment: 1000,
      creditScore: 720,
      grossMonthlyIncome: 5000,
      monthlyCreditCardPayment: 150,
      homeAppraisedValue: 250000,
      downPaymentAmount: 50000,
    },
    {
      id: "2",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      age: 35,
      monthlyCarPayment: 250,
      monthlyStudentLoanPayment: 0,
      monthlyMortgagePayment: 800,
      creditScore: 680,
      grossMonthlyIncome: 4000,
      monthlyCreditCardPayment: 100,
      homeAppraisedValue: 180000,
      downPaymentAmount: 36000,
    },
    {
      id: "3",
      firstName: "Carol",
      lastName: "Williams",
      email: "carol.williams@example.com",
      age: 40,
      monthlyCarPayment: 0,
      monthlyStudentLoanPayment: 150,
      monthlyMortgagePayment: 1200,
      creditScore: 750,
      grossMonthlyIncome: 7000,
      monthlyCreditCardPayment: 200,
      homeAppraisedValue: 300000,
      downPaymentAmount: 60000,
    },
    // ... more user objects
  ];

  const renderContent = () => {
    if (activeSegment === "form") {
      // Render form steps
      return renderStep();
    } else if (activeSegment === "discover") {
      // Render Discover segment with the graph
      return (
        <div>
          <CreditScoreDistribution userData={userData} />
          <IncomeDebtComparison userData={userData} />
          <HomeOwnershipReadiness userData={userData} />
        </div>
      );
    }
  };
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
    age: "",
    creditScore: 500,
    grossMonthlyIncome: "",
    monthlyCarPayment: "",
    monthlyStudentLoanPayment: "",
    monthlyCreditCardPayment: "",
    homeAppraisedValue: "",
    downPaymentAmount: "",
    monthlyMortgagePayment: "",
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

    // Function to send email
    const sendEmail = async () => {
      try {
        await Axios.post("http://localhost:3001/api/send-email", {
          to: "amber.hasan@gmail.com", // Recipient's email address
          subject: "Hello World",
          text: "This is your message",
        });
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
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
              <button type="submit" className="next-prev-buttons submit-button">
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
            ltv={mortgageDecision.ltv}
            dti={mortgageDecision.dti}
            fedti={mortgageDecision.fedti}
            creditScore={formData.creditScore}
          />
        );

      default:
        return <div>Hello</div>;
    }
  };

  return (
    <div className="App">
      <h1>Home Buying Readiness Form</h1>
      <div className="segmented-buttons">
        <button
          className={`segment-button ${
            activeSegment === "form" ? "active" : ""
          }`}
          onClick={() => handleSegmentChange("form")}
        >
          Form
        </button>
        <button
          className={`segment-button ${
            activeSegment === "discover" ? "active" : ""
          }`}
          onClick={() => handleSegmentChange("discover")}
        >
          Discover
        </button>
      </div>{" "}
      <form onSubmit={handleSubmit} className="form">
        {renderContent()}
      </form>
    </div>
  );
}

export default App;
