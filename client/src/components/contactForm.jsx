import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  // Store the current values entered into the form. This mirrors the columns in
  // the "contact" table we created in MySQL Workbench.
  const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Track the message we want to show back to the learner after they click
  // submit. This will display success or error feedback above the form.
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      // The base URL defaults to localhost so the code works right away in class.
      .post(`${apiBaseUrl}/submit-form`, formData)
      .then((response) => {
        setStatusType("success");
        setStatusMessage(response.data.message);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error(error);
        setStatusType("error");
        setStatusMessage(
          error.response?.data?.message ||
            "We hit a snag saving your message. Please try again."
        );
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setStatusMessage(null);
    setStatusType(null);
  };

  return (
    <div id="contact">
      {statusMessage && (
        <p className={`status-message ${statusType}`}>{statusMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          className="name"
          id="fname"
          name="firstname"
          placeholder="Your name.."
          value={formData.firstname}
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          className="name"
          id="lname"
          name="lastname"
          placeholder="Your last name.."
          value={formData.lastname}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="name"
          id="email"
          name="email"
          placeholder="Please leave an email address where we can reach you"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="subject">Subject</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write something.."
          value={formData.subject}
          onChange={handleInputChange}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
