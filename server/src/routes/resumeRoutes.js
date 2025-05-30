// import express from 'express';
// import upload from '../middlewares/resumeMiddleware.js';
// import { parseResumeAndSearch } from '../controllers/resumeController.js';

// const router = express.Router();

// router.post('/upload', 
//   upload.single('resume'), 
//   (err, req, res, next) => {

//     if (err) {
//       return res.status(400).json({ 
//         success: false,
//         error: err.message 
//       });
//     }
//     next();
//   },
//   parseResumeAndSearch
// );

// export default router;