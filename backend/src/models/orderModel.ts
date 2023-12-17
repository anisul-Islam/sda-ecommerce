import { Schema, model, Document } from 'mongoose';

import { ICategory } from './categorySchema';
import { IProduct } from './productSchema';
import { IUser } from './userScheam';

export interface IOrderProduct {
  product: IProduct['_id'];
  quantity: number;
}

interface IOrderPayment {}

export interface IOrder extends Document {
  products: IOrderProduct[];
  payment: IOrderPayment;
  buyer: IUser['_id'];
  status:
    | 'Not Processed'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';
}

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, trim: true },
      },
    ],
    payment: { type: Object, required: true }, 
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: [
        'Not Processed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ],
      default: 'Not Processed',
    },
  },
  { timestamps: true }
);

// create the model/collections
export const Order = model<IOrder>('Order', orderSchema);

