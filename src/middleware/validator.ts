import { NextFunction, Request, Response } from 'express';
import CustomAPIError from '../errors';
import { Schema } from 'joi';

export default (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: ' ',
      },
    },
  });

  if (error) {
    throw new CustomAPIError.BadRequestError(`${error}`);
  } else {
    next();
  }
};
