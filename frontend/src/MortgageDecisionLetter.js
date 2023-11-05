import React from "react";

function MortgageDecisionLetter({ canBuyHouse, message }) {
  return (
    <div>
      <h1>Mortgage Application Decision</h1>
      {canBuyHouse ? (
        <p>
          Congratulations!
          <br />
          We are pleased to inform you that you meet the criteria to buy a
          house.
        </p>
      ) : (
        <p>
          We regret to inform you that your mortgage application has been
          declined.
          <br />
          <strong>Reason:</strong> {message}
          <br />
          <strong>Additional Information:</strong>
          <br />
          - Your credit score is below the required 640. You should work on
          improving your credit score by managing your credit responsibly.
          <br />
          - Your Debt-to-Income (DTI) ratio exceeds the acceptable limit.
          Consider reducing your debts and increasing your income to lower your
          DTI.
          <br />
          - Your Loan-to-Value (LTV) ratio is above 80%. To lower your LTV, you
          may consider increasing your down payment or obtaining home insurance.
          <br />
          - Your Front-End Debt-to-Income (FEDTI) ratio is higher than the
          recommended 28%. You can improve your FEDTI by reducing your mortgage
          payment or increasing your income.
          <br />
          <strong>
            We encourage you to address these issues to increase your chances of
            mortgage approval in the future.
          </strong>
        </p>
      )}
    </div>
  );
}

export default MortgageDecisionLetter;
