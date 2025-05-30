import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js';
dotenv.config();

const PORT = process.env.PORT || 8081;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  
  }
}

startServer();
