// import pdfParse from 'pdf-parse';
// import fs from 'fs';
// import { promisify } from 'util';
// import Job from '../models/Job.model.js';

// // Convert callback-based unlink to promise-based
// const unlinkAsync = promisify(fs.unlink);

// export const parseResumeAndSearch = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ 
//       success: false,
//       error: 'No resume file uploaded' 
//     });
//   }

//   try {
//     // Read and parse PDF
//     const pdfBuffer = fs.readFileSync(req.file.path);
//     const { text } = await pdfParse(pdfBuffer);
//     const lowercaseText = text.toLowerCase();

//     // Define keyword-role mapping
//     const keywords = {
//       'full stack developer': ['react', 'node', 'express', 'mongodb', 'full stack'],
//       'frontend developer': ['html', 'css', 'javascript', 'react', 'vue'],
//       'backend developer': ['node', 'express', 'django', 'api', 'server'],
//       'data analyst': ['excel', 'sql', 'python', 'data', 'analytics'],
//       'machine learning engineer': ['python', 'tensorflow', 'pytorch', 'machine learning']
//     };

//     // Match roles from resume text
//     const matchedRoles = Object.entries(keywords)
//       .filter(([_, terms]) => terms.some(term => lowercaseText.includes(term)))
//       .map(([role]) => role);

//     const matchedRole = matchedRoles[0] || 'developer';

//     // Search for matching jobs
//     const jobs = await Job.find({ $text: { $search: matchedRole } }).limit(20);

//     // Clean up uploaded file
//     await unlinkAsync(req.file.path);

//     return res.status(200).json({ 
//       success: true,
//       matchedRole,
//       jobs,
//       extractedText: text.substring(0, 500) + '...' // First 500 chars for debugging
//     });

//   } catch (error) {
//     console.error('Resume Processing Error:', error);
    
//     // Clean up file if error occurred
//     if (req.file?.path && fs.existsSync(req.file.path)) {
//       await unlinkAsync(req.file.path).catch(err => console.error('File deletion error:', err));
//     }

//     return res.status(500).json({ 
//       success: false,
//       error: 'Failed to process resume',
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };