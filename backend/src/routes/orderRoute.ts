import { Router } from 'express';
import { isAdmin, isLoggedIn } from '../middlewares/auth';
import {
  getOrderForUser,
  getOrdersForAdmin,
  handleProcessPayment,
} from '../controllers/orderController';

const router = Router();

// POST : /orders/process-payment -> process the payment for new order
router.post('/process-payment', isLoggedIn, handleProcessPayment);

// GET : /orders/:id -> get the order for the user
router.get('/:id([0-9a-fA-F]{24})', isLoggedIn, getOrderForUser);

// GET : /orders/all-orders -> get the order for the user
router.get('/all-orders', isLoggedIn, isAdmin, getOrdersForAdmin);

export default router;
