// routes/keywordRoutes.js
import express from 'express';
import { logKeyword, getTopKeywords } from '../controllers/keywordController.js';

const router = express.Router();

router.post('/', logKeyword);
router.get('/', getTopKeywords);

export default router;
