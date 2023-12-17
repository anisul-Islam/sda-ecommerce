import { NextFunction, Request, Response } from 'express';
import { IOrder, IOrderProduct, Order } from '../models/orderModel';

interface CustomRequest extends Request {
  userId?: string;
}

// POST: /orders/process-payment -> process the payment for new order
export const handleProcessPayment = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // products, payment
    const { cartItems, payment } = req.body;
    // req.userId;

    // calculate the total price of the order
    // start handling payment process
    // if the payment is successful then place the order
    const newOrder: IOrder = new Order({
      products:
        cartItems.products.length > 0 &&
        cartItems.products.map((item: IOrderProduct) => ({
          product: item.product,
          quantity: item.quantity,
        })),
      payment: cartItems.payment,
      buyer: req.userId,
    });
    await newOrder.save();

    // sold values should be updated
    res.send({ message: 'payment was successful and order was created' });
  } catch (error) {
    next(error);
  }
};

// get: /orders/:id -> get the order for the user
export const getOrderForUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ buyer: userId })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'title price',
        },
      })
      .populate('buyer', 'name email phone');
    res.send({ message: 'orders are returned for the user', paylod: orders });
  } catch (error) {
    next(error);
  }
};

// get: /orders/all-orders -> get all the orders
export const getOrdersForAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'title price',
        },
      })
      .populate('buyer', 'name email phone');
    res.send({ message: 'orders are returned for the admin', paylod: orders });
  } catch (error) {
    next(error);
  }
};

// updating the status of the order
