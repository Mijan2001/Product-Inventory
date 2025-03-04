import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    updateProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post('/profile/edit', protect, updateProfile);

export default router;
