import User, { IUser } from '../models/userScheam';
import { createHttpError } from '../util/createHTTPError';

export const getUsers = async (page = 1, limit = 3, search = '') => {
  const count = await User.countDocuments();
  const totalPages = Math.ceil(count / limit);

  const searchRegExp = new RegExp('.*' + search + '.*', 'i');
  const filter = {
    isAdmin: { $ne: true },
    $or: [
      { name: { $regex: searchRegExp } },
      { email: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
  };

  const option = {
    password: 0,
    __v: 0,
  };

  if (page > totalPages) {
    page = totalPages;
  }

  const skip = (page - 1) * limit;
  const users: IUser[] = await User.find(filter, option)
    .skip(skip)
    .limit(limit);
  return {
    users,
    totalPages,
    currentPage: page,
  };
};

export const findUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    const error = createHttpError(404, 'User not found with this id');
    throw error;
  }
  return user;
};

export const banUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBanned: true });
  if (!user) {
    const error = createHttpError(404, 'User not found with this id');
    throw error;
  }
};

export const unbanUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBanned: false });
  if (!user) {
    const error = createHttpError(404, 'User not found with this id');
    throw error;
  }
};

// admin 1: anisul islam
// admin 2: rubel islam
// user 1: alex
// user 2: david
