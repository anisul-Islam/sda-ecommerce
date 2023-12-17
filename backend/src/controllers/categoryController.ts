import { NextFunction, Request, Response } from 'express';
import slugify from 'slugify';
import mongoose from 'mongoose';

import { Category, ICategory } from '../models/categorySchema';
import { createHttpError } from '../util/createHTTPError';
import { findCategoryById } from '../services/categoryService';

// GET : /categories -> get all the categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: ICategory[] = await Category.find();
    res.send({
      message: 'get all categories',
      payload: categories,
    });
  } catch (error) {
    next(error);
  }
};

// POST : /categories -> create category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    // product already exists or not with this title
    const categoryExist = await Category.exists({ title: title });
    if (categoryExist) {
      const error = createHttpError(
        409,
        'Category already exist with this title'
      );
      throw error;
    }

    const newCategory: ICategory = new Category({
      title: title,
      slug: slugify(title),
    });

    await newCategory.save();
    res.status(201).send({ message: 'category is created' });
  } catch (error) {
    next(error);
  }
};

// GET : /categories/:id -> get a single category by id
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await findCategoryById(req.params.id);
    res.send({ message: 'returned a single category', payload: category });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id format is not valid');
       next(error);
    } else {
      next(error);
    }
  }
};
