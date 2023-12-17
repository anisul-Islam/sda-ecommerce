import { NextFunction, Request, Response } from 'express';
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload,
} from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/userScheam';
import { createHttpError } from '../util/createHTTPError';
import { dev } from '../config';
import { handleSendEmail } from '../helper/sendEmail';
import { createJSONWebToken } from '../helper/jwtHelper';
import {
  banUserById,
  findUserById,
  getUsers,
  unbanUserById,
} from '../services/userService';
import { UserType } from '../types';
import mongoose from 'mongoose';
import { deleteImage } from '../helper/deleteImageHelper';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: dev.cloud.cloudinaryName,
  api_key: dev.cloud.cloudinaryAPIKey,
  api_secret: dev.cloud.cloudinaryAPISecretKey,
});

// POST: /users/process-registration -> process user registration
export const processRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const imagePath = req.file && req.file.path;

    const isUserExists = await User.exists({ email: email });
    if (isUserExists) {
      throw createHttpError(409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenPayload: UserType = {
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      phone: phone,
    };

    if (imagePath) {
      tokenPayload.image = imagePath;
    }

    const token = createJSONWebToken(
      tokenPayload,
      String(dev.app.jwtUserActivationKey),
      '1m'
    );

    const emailData = {
      email: email,
      subject: 'Activate User Email',
      html: `<h1>Hello ${name}</h1>      
      <a href="http://localhost:3000/user/activate/${token}">Please click on this link to verify your email address.</a>`,
    };

    await handleSendEmail(emailData);

    res.status(200).json({
      message: 'check your email to activate your account',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// POST: /users/activate -> activate the user
export const activateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw createHttpError(404, 'Please provide a token');
    }
    const decoded = jwt.verify(
      token,
      String(dev.app.jwtUserActivationKey)
    ) as JwtPayload;
    if (!decoded) {
      throw createHttpError(401, 'Invalid token');
    }
    // decoded.image -> store in cloudinary -> retunr a url
    const response = await cloudinary.uploader.upload(decoded.image, {
      folder: 'sda-ecommerce',
    });
    decoded.image = response.secure_url;
    await User.create(decoded);
    res.status(201).json({
      message: 'user is registered successfully',
    });
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      const errorMessage =
        error instanceof TokenExpiredError
          ? 'Token has expired'
          : 'Invalid token';
      next(createHttpError(401, errorMessage));
    } else {
      next(error);
    }
  }
};

// GET : /users -> get all the users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = req.query.search as string;

    const { users, totalPages, currentPage } = await getUsers(
      page,
      limit,
      search
    );

    res.send({
      message: 'get all users',
      payload: {
        users,
        totalPages,
        currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET : /users/:id -> get a single user by id
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.params.id);
    res.send({ message: 'returned a single user', payload: user });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id format is not valid');
      next(error);
    } else {
      next(error);
    }
  }
};

// PUT : /users/ban/:id -> ban a user by id
export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await banUserById(req.params.id);
    res.send({ message: 'banned the user' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id format is not valid');
      next(error);
    } else {
      next(error);
    }
  }
};

// PUT : /users/unban/:id -> unban a user by id
export const unbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await unbanUserById(req.params.id);
    res.send({ message: 'unbanned the user' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id format is not valid');
      next(error);
    } else {
      next(error);
    }
  }
};

// DELETE : /users/:id -> delete a user by id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // delete image from cloudinary
    // if (user && user.image) {
    //   await deleteImage(user.image);
    // }
    res.send({ message: 'deleted the user' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'Id format is not valid');
      next(error);
    } else {
      next(error);
    }
  }
};

// POST : /users/forget-password -> handle forget password
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw createHttpError(
        409,
        'User does not exists with this email addess. Please register yourself first'
      );
    }

    // creating token
    const token = createJSONWebToken(
      { email },
      String(dev.app.jwtResetPasswordKey),
      '1m'
    );

    const emailData = {
      email: email,
      subject: 'Reset Password Email',
      html: `
      <h1>Hello ${user.name}</h1>      
      <p>Please click here to <a href="http://localhost:3001/users/reset-password/${token}">reset password</a></p>`,
    };

    await handleSendEmail(emailData);
    res.send({
      message: 'please check your email to reset password ',
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

// PUT : /users/reset-password -> handle reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(
      token,
      String(dev.app.jwtResetPasswordKey)
    ) as JwtPayload;

    if (!decoded) {
      throw createHttpError(400, 'Invalid token');
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { password: bcrypt.hashSync(password, 10) } }
    );
    if (!updatedUser) {
      throw createHttpError(400, 'Reset password was unsuccessful');
    }
    res.send({
      message: 'Reset password was successful',
    });
  } catch (error) {
    next(error);
  }
};
