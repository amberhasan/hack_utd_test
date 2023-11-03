// db.js

const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    // Replace '<db_url>' with the actual MongoDB connection URL
    const DB_URL =
      "mongodb+srv://amberhasan:Testing123!!@cluster0.qvymich.mongodb.net/";
    // Connect to the MongoDB database
    await mongoose.connect(DB_URL);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    // Handle the error or exit the application as needed
  }
};

// Call the function to connect to MongoDB
connectToMongoDB();

// Export the Mongoose connection (optional, but useful for reuse)
module.exports = mongoose.connection;
