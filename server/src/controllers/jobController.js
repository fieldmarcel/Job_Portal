import Job from '../models/Job.model.js';

export const createJob = async (req, res) => {  // Changed to named export
  try {
    if (!req.body.job_title || !req.body.company_name) {
      return res.status(400).json({ error: 'job_title and company_name are required' });
    }

    const savedJob = await Job.create(req.body); // Better than new+save
    res.status(201).json(savedJob);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { search } = req.query;
    
    // 1. Create optimized query
    const query = search ? { 
      $text: { $search: search } 
    } : {};
    
    // 2. Add performance optimizations
    const jobs = await Job.find(query)
      .limit(50)
      .lean() // Convert to plain JS objects (faster)
      .maxTimeMS(30000) // Increase timeout to 30 seconds
      .select('-__v') // Exclude version key
      .catch(err => {
        console.error('Database query failed:', err);
        throw err;
      });

    // 3. Add cache-control headers
    res.set('Cache-Control', 'public, max-age=60');
    res.json(jobs);

  } catch (err) {
    // 4. Improved error handling
    console.error('Error in getJobs:', {
      query: req.query,
      error: err.message,
      stack: err.stack
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch jobs',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};