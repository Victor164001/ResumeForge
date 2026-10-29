import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login, me, updateMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

/* Slow down password guessing: 20 attempts per 15 minutes per IP. */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Wait a few minutes and try again.' },
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', protect, me);
router.patch('/me', protect, updateMe);

export default router;
