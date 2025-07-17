// db.js
const mongoose = require('mongoose');

// MongoDB connection string (replace with your MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/SmartCanteen'; // Update if using a cloud instance like MongoDB Atlas

const connectDB = async () => {
  try {
  const db=  await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
