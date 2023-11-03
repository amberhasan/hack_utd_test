// app.js

const express = require("express");
const mongoose = require("mongoose"); // Import Mongoose
const db = require("./db"); // Import the Mongoose connection

const app = express();

// Define a Mongoose schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a Mongoose model using the schema
const Person = mongoose.model("Person", personSchema);

// Use the model to interact with the database
app.get("/people", async (req, res) => {
  try {
    const people = await Person.find(); // Find all documents in the "Person" collection
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
