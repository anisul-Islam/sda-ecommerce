import { IProduct, Product } from '../models/productSchema';
import { createHttpError } from '../util/createHTTPError';

export const getProducts = async (page = 1, limit = 3, search = '') => {
  const count = await Product.countDocuments();
  const totalPages = Math.ceil(count / limit);

  const searchRegExp = new RegExp('.*' + search + '.*', 'i');
  
  const filter = {
    $or: [
      { title: { $regex: searchRegExp } },
      { description: { $regex: searchRegExp } },
    ],
  };

  const options = {
    __v: 0,
    updatedAt: 0,
  };

  if (page > totalPages) {
    page = totalPages;
  }

  const skip = (page - 1) * limit;
  const products: IProduct[] = await Product.find(filter, options)
    .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ price: 1 });
  return {
    products,
    totalPages,
    currentPage: page,
  };
};

export const findProductBySlug = async (slug: string): Promise<IProduct> => {
  const product = await Product.findOne({ slug: slug });
  if (!product) {
    const error = createHttpError(404, 'Product not found with this slug');
    throw error;
  }
  return product;
};

export const removeProductBySlug = async (slug: string) => {
  const product = await Product.findOneAndDelete({
    slug: slug,
  });
  if (!product) {
    const error = createHttpError(404, 'Product not found with this slug');
    throw error;
  }
  return product;
};

// Enter any value for searching user with name, email, phone
