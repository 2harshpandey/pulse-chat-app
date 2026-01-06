const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB connected successfully.');
  } catch (error) {
    logger.error('MongoDB connection failed:', { message: error.message, stack: error.stack });
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
