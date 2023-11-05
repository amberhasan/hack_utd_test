// calculateMortgage.js

const calculateMortgage = (formData) => {
  const {
    homeAppraisedValue,
    downPaymentAmount,
    monthlyCarPayment,
    monthlyStudentLoanPayment,
    monthlyCreditCardPayment,
    grossMonthlyIncome,
    monthlyMortgagePayment,
    creditScore,
  } = formData;

  const ltv =
    ((homeAppraisedValue - downPaymentAmount) / homeAppraisedValue) * 100;
  const dti =
    ((parseFloat(monthlyCarPayment) +
      parseFloat(monthlyStudentLoanPayment) +
      parseFloat(monthlyMortgagePayment) +
      parseFloat(monthlyCreditCardPayment)) /
      parseFloat(grossMonthlyIncome)) *
    100;
  const fedti =
    (parseFloat(monthlyMortgagePayment) / parseFloat(grossMonthlyIncome)) * 100;
  const canBuyHouse =
    parseInt(creditScore, 10) >= 640 && ltv < 80 && dti < 36 && fedti < 28;

  const message = canBuyHouse
    ? "Congratulations! You can buy a house."
    : "Sorry, you do not meet the criteria to buy a house.";

  return { ltv, dti, fedti, canBuyHouse, message };
};

export default calculateMortgage;
