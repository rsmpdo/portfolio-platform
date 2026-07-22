const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    // Disable query buffering so requests fail immediately with a clear error instead of hanging
    mongoose.set('bufferCommands', false);
    console.log('Server continuing in offline/standalone mode...');
  }
};

module.exports = connectDB;
