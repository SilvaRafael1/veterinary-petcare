import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import errorHandlerMiddleware, { CustomError } from '../../../src/middleware/error-handler';

describe('errorHandlerMiddleware', () => {
  it('Should return status 500 and default message for unknown errors', () => {
    const err: CustomError = {};
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Something is wrong try again' });
    expect(next).not.toHaveBeenCalled();
  });

  it('Should return status 400 and correct message for validation errors', () => {
    const err: CustomError = {
      name: 'ValidationError',
      errors: [{ message: 'Error 1' }, { message: 'Error 2' }],
    };
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error 1,Error 2' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status 400 and correct message for value duplication errors', () => {
    const err: CustomError = {
      code: 11000,
    };
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Duplicate values for  field, please choose another value',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return status 404 and correct message for cast errors', () => {
    const err: CustomError = {
      name: 'CastError',
      value: 123,
    };
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'No items with: 123' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() when there is no error', () => {
    const err: CustomError | undefined = undefined;
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
