const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

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
  name: String,
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

// http://localhost:3001/users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.post("/api/submitData", async (req, res) => {
  const newData = new User(req.body);
  try {
    await newData.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving data" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
