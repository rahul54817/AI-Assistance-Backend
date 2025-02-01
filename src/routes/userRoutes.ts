import express from 'express';
import { registerUser } from '../controllers/userController';

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

export default router;