// app.js

const express = require("express");
const mongoose = require("mongoose"); // Import Mongoose
const db = require("./db"); // Import the Mongoose connection
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Define a Mongoose schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a Mongoose model using the schema
const Person = mongoose.model("Person", personSchema);

// Use the model to interact with the database
app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
