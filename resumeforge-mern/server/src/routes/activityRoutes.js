import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { listActivity, addActivity, markSeen } from '../controllers/activityController.js';

const router = Router();
router.use(protect);
router.route('/').get(listActivity).post(addActivity);
router.post('/seen', markSeen);

export default router;
