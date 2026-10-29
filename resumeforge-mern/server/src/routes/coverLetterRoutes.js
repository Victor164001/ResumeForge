import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getCoverLetter, saveCoverLetter } from '../controllers/coverLetterController.js';

const router = Router();
router.use(protect);
router.route('/').get(getCoverLetter).put(saveCoverLetter);

export default router;
