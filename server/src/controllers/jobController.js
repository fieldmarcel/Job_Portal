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

export const getJobs = async (req, res) => {  // Changed to named export
  try {
    const { search } = req.query;
    const query = search ? { $text: { $search: search } } : {};
    const jobs = await Job.find(query).limit(50);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};