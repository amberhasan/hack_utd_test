const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Database configuration and connection setup
const db = require("./db"); // This will run your database connection code

// Express application setup
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

// Define a Mongoose schema for the users collection
const userSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  monthlyCarPayment: Number,
  monthlyStudentLoanPayment: Number,
  monthlyMortgagePayment: Number,
  creditScore: Number,
  grossMonthlyIncome: Number,
  monthlyCreditCardPayment: Number,
  homeAppraisedValue: Number,
  downPaymentAmount: Number,
});

// Create a Mongoose model based on the schema
// The third parameter 'users' specifies the exact name of the collection in MongoDB
const User = mongoose.model("User", userSchema, "users");

// Set up nodemailer transport here
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider
  auth: {
    user: "amber.hasan@gmail.com", // Your email
    pass: "EmailOnly", // Your password
  },
});
// http://localhost:3001/users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

//http://localhost:3001/api/send-email

app.post("/api/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "amber.hasan@gmail.com", // Sender address
    to: to, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).send(`Error sending email ${err}`);
    } else {
      console.log(info);
      res.status(200).send("Email sent");
    }
  });
});
//http://localhost:3001/api/submitData
app.post("/api/submitData", async (req, res) => {
  const newData = new User(req.body);
  try {
    await newData.save();
    res.json({ message: "" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving data" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
