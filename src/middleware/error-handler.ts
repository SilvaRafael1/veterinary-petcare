import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export interface CustomError {
  statusCode?: number;
  name?: string;
  message?: string;
  errors?: { message: string }[];
  code?: number;
  keyValue?: string;
  value?: number;
}

const errorHandlerMiddleware = (
  err: CustomError | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something is wrong try again',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors || [])
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate values for ${Object.keys(
      err.keyValue || '',
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No items with: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
export default errorHandlerMiddleware;
