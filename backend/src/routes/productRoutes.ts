import { Router } from 'express';

import {
  createProduct,
  deleteProductBySlug,
  getAllProducts,
  getProductBySlug,
  updateProductBySlug,
} from '../controllers/productController';
import { uploadProduct } from '../middlewares/uploadFile';
import { isAdmin, isLoggedIn } from '../middlewares/auth';

const router = Router();

// GET : /products -> return all products
router.get('/', getAllProducts);

// GET : /products/:slug -> return a single product by slug
router.get('/:slug', getProductBySlug);

// DELETE : /products/:slug -> delete a single product by slug
router.delete('/:slug', isLoggedIn, isAdmin, deleteProductBySlug);

// PUT : /products/:slug -> update a single product by slug
router.put('/:slug', updateProductBySlug);

// POST : /products -> create a new product
router.post('/', uploadProduct.single('image'), createProduct);

export default router;
