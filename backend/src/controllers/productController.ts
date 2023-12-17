import slugify from 'slugify';
import { NextFunction, Request, Response } from 'express';

import { IProduct, Product } from '../models/productSchema';
import { createHttpError } from '../util/createHTTPError';
import {
  findProductBySlug,
  getProducts,
  removeProductBySlug,
} from '../services/productService';

/*
creating the error 
const error = new Error();
error.status(404);
error.message("message goes here");
*/

// GET : /products -> get all the products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = req.query.search as string;

    const { products, totalPages, currentPage } = await getProducts(
      page,
      limit,
      search
    );

    res.send({
      message: 'get all products',
      payload: {
        products,
        totalPages,
        currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET : /products/:slug -> get a single product by slug
export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await findProductBySlug(req.params.slug);
    res.send({ message: 'returned a single product', payload: product });
  } catch (error) {
    next(error);
  }
};

// DELETE : /products/:slug -> delete a single product by slug
export const deleteProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('delete product controller');
    const product = await removeProductBySlug(req.params.slug);
    res.send({ message: 'deleted a single product', payload: product });
  } catch (error) {
    next(error);
  }
};

// POST : /products -> create product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price, description, category, quantity, sold, shipping } =
      req.body;

    // product already exists or not with this title
    const productExist = await Product.exists({ title: title });
    if (productExist) {
      throw new Error('Product already exist with this title');
    }

    const newProduct: IProduct = new Product({
      title: title,
      slug: slugify(title),
      price: price,
      image: req.file?.path,
      description: description,
      quantity: quantity,
      category: category,
      sold: sold,
      shipping: shipping,
    });

    await newProduct.save();
    res.status(201).send({ message: 'product is created' });
  } catch (error) {
    next(error);
  }
};

// PUT : /products/:slug -> update a single product by slug
export const updateProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    Product.find;
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!product) {
      const error = createHttpError(404, 'Product not found with this slug');
      throw error;
    }
    res.send({ message: 'update a single product', payload: product });
  } catch (error) {
    next(error);
  }
};
