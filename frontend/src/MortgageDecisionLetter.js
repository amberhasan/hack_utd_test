import React from "react";

function MortgageDecisionLetter({
  canBuyHouse,
  message,
  ltv,
  dti,
  fedti,
  creditScore,
}) {
  const letterStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
    lineHeight: "1.6",
  };

  const headingStyle = {
    color: "#333",
    textAlign: "center",
  };

  const messageStyle = {
    fontSize: "1rem",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: canBuyHouse ? "#e8f5e9" : "#ffebee",
    border: canBuyHouse ? "1px solid #c8e6c9" : "1px solid #ffcdd2",
  };

  const listStyle = {
    marginTop: "20px",
    paddingLeft: "20px",
  };

  return (
    <div style={letterStyle}>
      <h1 style={headingStyle}>Mortgage Application Decision</h1>
      <div style={messageStyle}>
        {canBuyHouse ? (
          <p>
            Congratulations! We are pleased to inform you that you meet the
            criteria to buy a house.
          </p>
        ) : (
          <>
            <p>
              We regret to inform you that your mortgage application has been
              declined.
            </p>
            {message && (
              <p>
                <strong>Reason:</strong> {message}
              </p>
            )}
            <ul style={listStyle}>
              {creditScore < 640 && (
                <li>
                  Your credit score is below the required 640. You should work
                  on improving your credit score by managing your credit
                  responsibly.
                </li>
              )}
              {dti > 0.43 && ( // Assuming 43% as an example upper limit for DTI
                <li>
                  Your Debt-to-Income (DTI) ratio exceeds the acceptable limit.
                  Consider reducing your debts and increasing your income to
                  lower your DTI.
                </li>
              )}
              {ltv > 80 && (
                <li>
                  Your Loan-to-Value (LTV) ratio is above 80%. To lower your
                  LTV, you may consider increasing your down payment or
                  obtaining home insurance.
                </li>
              )}
              {fedti > 0.28 && ( // Assuming 28% as an example upper limit for FEDTI
                <li>
                  Your Front-End Debt-to-Income (FEDTI) ratio is higher than the
                  recommended 28%. You can improve your FEDTI by reducing your
                  mortgage payment or increasing your income.
                </li>
              )}
            </ul>
            {message && (
              <p>
                <strong>
                  We encourage you to address these issues to increase your
                  chances of mortgage approval in the future.
                </strong>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MortgageDecisionLetter;
