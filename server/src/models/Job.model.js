import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  job_title: String,
  company_name: String,
  job_location: String,
  apply_link: String,
  job_description: String,
  source: String,
}, { timestamps: true });

jobSchema.index({ job_title: "text", job_description: "text" });

export default mongoose.model('Job', jobSchema);
