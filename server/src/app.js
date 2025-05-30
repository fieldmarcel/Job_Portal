import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes.js';
import keywordRoutes from './routes/keywordRoutes.js';
// import resumeRoutes from './routes/resumeRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/search', keywordRoutes);
// app.use('/api/v1/resume', resumeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (added)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;