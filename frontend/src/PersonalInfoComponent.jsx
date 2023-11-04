// PersonalInfoComponent.jsx
import React, { useState } from "react";
import "./PersonalInfoComponent.css"; // Ensure the path to the CSS file is correct

const PersonalInfoComponent = (props) => {
  // If you need to manage local state or handle changes, use useState and other hooks here
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const handleChange = (event) => {
    // You would implement a change handler similar to the one in App.js
    const { name, value } = event.target;
    setPersonalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="personal-info-container">
      <div className="name-container">
        <div className="personal-info-field">
          <input
            type="text"
            name="firstName"
            placeholder="👤 First Name"
            value={personalData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="personal-info-field">
          <input
            type="text"
            name="lastName"
            placeholder="👤 Last Name"
            value={personalData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="personal-info-field">
        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={personalData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="personal-info-field">
        <input
          type="number"
          name="age"
          placeholder="🎂 Age"
          value={personalData.age}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoComponent;
