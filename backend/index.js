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

// Define a Mongoose schema for the listingsAndReviews collection
const listingSchema = new mongoose.Schema({
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
// The third parameter 'listingsAndReviews' specifies the exact name of the collection in MongoDB
const Listing = mongoose.model("Listing", listingSchema, "listingsAndReviews");

// http://localhost:3001/listings
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
});

app.post("/api/submitData", async (req, res) => {
  const newData = new Listing(req.body);

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
