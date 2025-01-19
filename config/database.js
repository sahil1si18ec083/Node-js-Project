const mongoose = require("mongoose");
const { responseModal } = require("../models/ResponseCode");
const responseCodes = require("../utils/responseCodes");
require("dotenv").config();
const connectToDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Check if records already exist (using a unique property, e.g., _id or a unique field)
    const existingRecords = await responseModal.find({}).exec();

    // Only insert if no records exist
    if (existingRecords.length === 0) {
      await responseModal.insertMany(responseCodes);
      console.log('Records inserted');
    } else {
      console.log('Records already exist, skipping insertion');
    }

  } catch (error) {
    console.error('Error:', error);
  } 
};

// Sample responseCodes array


// Run the function to connect and insert data
connectToDB();
