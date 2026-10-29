import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  listResumes, getResume, createResume, updateResume,
  duplicateResume, deleteResume, resumeAts,
} from '../controllers/resumeController.js';

const router = Router();
router.use(protect);

router.route('/').get(listResumes).post(createResume);
router.route('/:id').get(getResume).put(updateResume).delete(deleteResume);
router.post('/:id/duplicate', duplicateResume);
router.get('/:id/ats', resumeAts);

export default router;
