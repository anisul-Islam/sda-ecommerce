import { Request, Response, NextFunction } from 'express';

import { Error } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status || 500).send({
    message: error.message,
  });
};
