import { Schema, model, Document } from 'mongoose';
import { ICategory } from './categorySchema';

export interface IProduct extends Document {
  title: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  sold: number;
  shipping: number;
  category: ICategory['_id'];
  description: string;
}

const productSchema = new Schema(
  {
    // missing: image, category
    title: {
      type: String,
      // unique: true,
      required: true,
      trim: true,
      minlength: [3, 'Product title must be at least 3 characters long'],
      maxlength: [300, 'Product title must be at most 300 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'public/images/products/default.png',
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    shipping: {
      type: Number,
      default: 0, // 0 -> free
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Product description must be at least 3 characters long'],
    },
  },
  { timestamps: true }
);

// create the model/collections
export const Product = model<IProduct>('Product', productSchema);
