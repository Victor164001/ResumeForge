import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getStats, incrementStat } from '../controllers/statsController.js';

const router = Router();
router.use(protect);
router.get('/', getStats);
router.post('/:key/increment', incrementStat);

export default router;
