import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import User from '../models/userScheam';
import { createHttpError } from '../util/createHTTPError';
import { dev } from '../config';

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // step 1: get the email and password from the request body
    const { email, password } = req.body;

    // step 2: check if the user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      throw createHttpError(404, 'user not found with this email.');
    }

    // step 3: compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createHttpError(401, "password doesn't match.");
    }

    // step 4: check user is banned or not
    if (user.isBanned) {
      throw createHttpError(
        403,
        'User is banned. Please contact the authority'
      );
    }

    // step 5: create the access token
    const accessToken = JWT.sign(
      { _id: user._id },
      String(dev.app.jwtAccessKey),
      {
        expiresIn: '7m',
      }
    );

    // step 6: create the cookie and put this accessToken inside the cookie
    res.cookie('access_token', accessToken, {
      maxAge: 7 * 60 * 1000, // 8 minutes
      httpOnly: true,
      sameSite: 'none',
    });

    res.send({ message: 'user is logged in' });
  } catch (error) {
    next(error);
  }
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('access_token');
    res.send({ message: 'user is logged out' });
  } catch (error) {
    next(error);
  }
};
