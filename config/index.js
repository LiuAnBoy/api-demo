const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('DB is connected.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
