import { Category, ICategory } from '../models/categorySchema';
import { createHttpError } from '../util/createHTTPError';

export const findCategoryById = async (id: string): Promise<ICategory> => {
  const category = await Category.findOne({ _id: id });
  if (!category) {
    const error = createHttpError(404, 'category not found with this id');
    throw error;
  }
  return category;
};
