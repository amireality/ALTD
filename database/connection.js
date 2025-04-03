/**
 * Database Connection
 * AndWeSupport Website
 */

// This file would contain your database connection setup
// Below is a sample MongoDB connection setup using Mongoose

const mongoose = require('mongoose');

// Connection URI - replace with your actual database URI
// For production, you should use environment variables for sensitive data
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/andwesupport';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Handle app termination to close connection properly
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = {
  connectDB,
  mongoose
};