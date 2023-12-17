import { Router } from 'express';

import {
  activateUser,
  banUser,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUser,
  processRegisterUser,
  resetPassword,
  unbanUser,
} from '../controllers/userController';
import { uploadUser } from '../middlewares/uploadFile';
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth';

const router = Router();

// POST : /users/process-register -> process the registration for new user
// router.post(
//   '/process-register',
//   uploadUser.single('image'),
//   isLoggedOut,
//   processRegisterUser
// );

// router.post('/activate', isLoggedOut, activateUser);
// router.get('/', isLoggedIn, isAdmin, getAllUsers);
// router.get('/:id', isLoggedIn, getUser);
// router.put('/ban/:id', isLoggedIn, isAdmin, banUser);
// router.put('/unban/:id', isLoggedIn, isAdmin, unbanUser);
// router.delete('/:id', isLoggedIn, isAdmin, deleteUser);
// router.post('/forget-password', isLoggedOut, forgetPassword);
// router.put('/reset-password', isLoggedOut, resetPassword);

router.post(
  '/process-register',
  uploadUser.single('image'),
  processRegisterUser
);
router.post('/activate', activateUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/ban/:id', banUser);
router.put('/unban/:id', unbanUser);
router.delete('/:id', deleteUser);
router.post('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);

export default router;
