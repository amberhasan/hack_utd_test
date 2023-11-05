// PersonalInfoComponent.jsx
import React, { useState } from "react";
import "./PersonalInfoComponent.css"; // Ensure the path to the CSS file is correct

const PersonalInfoComponent = (props) => {
  // If you need to manage local state or handle changes, use useState and other hooks here

  return (
    <div className="personal-info-container">
      <div className="name-container">
        <div className="personal-info-field">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="👤 First Name"
            value={props.formData.firstName}
            onChange={props.handleChange}
            required
          />
        </div>
        <div className="personal-info-field">
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="👤 Last Name"
            value={props.formData.lastName}
            onChange={props.handleChange}
            required
          />
        </div>
      </div>
      <div className="personal-info-field">
        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={props.formData.email}
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="personal-info-field">
        <input
          type="number"
          name="age"
          placeholder="🎂 Age"
          value={props.formData.age}
          onChange={props.handleChange}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoComponent;
