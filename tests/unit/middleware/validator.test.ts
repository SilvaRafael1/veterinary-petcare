import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../../../src/errors/bad-request';
import validator from '../../../src/middleware/validator';
import Joi, { Schema } from 'joi';

describe('validateRequestMiddleware', () => {
  it('Must call the next() function if the request is valid', () => {
    const schema: Schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.string().required(),
    });

    const req: any = {
      name: 'John',
      age: '153',
    };

    const res: Partial<Response> = {};
    const next: NextFunction = jest.fn();

    const middleware = validator(schema);
    middleware(req, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should throw a BadRequestError if the request is invalid', () => {
    const schema: Schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.string().required(),
    });

    const req: Partial<Request> = {
      body: {
        name: 'John',
      },
    };
    const res: Partial<Response> = {};

    const middleware = validator(schema);

    expect(() => middleware(req as Request, res as Response, jest.fn())).toThrow(BadRequestError);
  });
});
