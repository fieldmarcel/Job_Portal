import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js';
dotenv.config();

const PORT = process.env.PORT || 8081;

async function startServer() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    
    // Verify connection is ready before starting server
    mongoose.connection.on('connected', () => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
startServer();
