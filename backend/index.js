const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Database configuration and connection setup
const db = require("./db"); // This will run your database connection code

// Express application setup
const app = express();
app.use(cors());
app.use(express.json());

// Define a Mongoose schema for the listingsAndReviews collection
const listingSchema = new mongoose.Schema({
  // Replace with the actual schema fields of the listingsAndReviews collection
  name: String,
  summary: String,
  bedrooms: Number,
  // ... add other fields as necessary
});

// Create a Mongoose model based on the schema
// The third parameter 'listingsAndReviews' specifies the exact name of the collection in MongoDB
const Listing = mongoose.model("Listing", listingSchema, "listingsAndReviews");

// Route to get all listings from the sample_airbnb database
// http://localhost:3001/listings
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
