// PersonalInfoComponent.jsx
import React, { useState } from "react";

const PersonalInfoComponent = (props) => {
  // If you need to manage local state or handle changes, use useState and other hooks here
  const [personalData, setPersonalData] = useState({
    lastName: "",
    // ...other financial fields
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
    <div>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={personalData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={personalData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personalData.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={personalData.age}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default PersonalInfoComponent;
