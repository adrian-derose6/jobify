import express from 'express';

import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10,
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
