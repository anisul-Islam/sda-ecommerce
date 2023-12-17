import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { createHttpError } from '../util/createHTTPError';
import { dev } from '../config';
import User from '../models/userScheam';

interface CustomRequest extends Request {
  userId?: string;
}

export const isLoggedIn = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw createHttpError(401, 'You are not logged in.');
    }

    const decoded = (await jwt.verify(
      accessToken,
      String(dev.app.jwtAccessKey)
    )) as JwtPayload;
    if (!decoded) {
      throw createHttpError(401, 'Invalid access token.');
    }

    req.userId = decoded._id;

    next();
  } catch (error) {
    next(error);
  }
};

export const isLoggedOut = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // token but expired
    const accessToken = req.cookies.access_token;

    if (accessToken) {
      throw createHttpError(401, 'You are already logged in.');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);
    if (user?.isAdmin) {
      next();
    } else {
      throw createHttpError(403, 'You are not admin.');
    }
  } catch (error) {
    next(error);
  }
};
