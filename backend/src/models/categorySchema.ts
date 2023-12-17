import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  slug: string;
}

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Category title must be at least 3 characters long'],
      maxlength: [100, 'Category title must be at most 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// create the model/collections
export const Category = model<ICategory>('Category', categorySchema);
