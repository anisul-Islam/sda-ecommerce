import { Router } from 'express';

import { handleLogin, handleLogout } from '../controllers/authController';
import { isLoggedOut } from '../middlewares/auth';

const router = Router();

// POST: /auth/login -> login the user
router.post('/login', isLoggedOut, handleLogin);

// POST: /auth/logout -> logout the user
router.post('/logout', handleLogout);

export default router;
