import express from 'express';
const router = express.Router();

import { registerUser, loginUser, refreshToken } from '../controllers/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

export default router;