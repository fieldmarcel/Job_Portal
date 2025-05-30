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
app.get('/', (req, res) => {
  res.json({
    status: 'API is running',
    endpoints: {
      jobs: '/api/v1/jobs',
      search: '/api/v1/search'
    }
  });
});
app.get('/healthcheck', (req, res) => {
  res.send('API is alive');
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// Add this BEFORE your 404 handler
// Add this in app.js before other routes


// Error handler (added)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;