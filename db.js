const mongoose = require('mongoose');

// Define mongodb connect url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

// set up MongoDB connection
mongoose.connect(mongoURL)

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', function () {
  console.log('Connected to MongoDB server');
});

db.on('error', function (err) {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', function () {
  console.log('MongoDB disconnected');
});