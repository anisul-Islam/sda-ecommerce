import { Router } from 'express';

import { createCategory, getAllCategories, getCategory } from '../controllers/categoryController';

const router = Router();

// GET : /categories -> return all categories
router.get('/', getAllCategories);

// GET : /categories/:id -> return single category by id
router.get('/:id', getCategory);

// POST : /categories -> create a new category
router.post('/', createCategory);

export default router;
