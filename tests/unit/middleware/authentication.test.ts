import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authenticateUser from '../../../src/middleware/authentication';
import CustomAPIError from '../../../src/errors';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Authentication middleware', () => {
  const validToken = 'valid-token';

  const req = {
    headers: {
      authorization: `Bearer ${validToken}`,
    },
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Must successfully authenticate and call next()', async () => {
    const payload = { userId: 'user-id' };
    (jwt.verify as jest.Mock).mockReturnValue(payload);

    await authenticateUser(req, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith(validToken, process.env.JWT_SECRET);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should throw authentication error if no token', async () => {
    req.headers.authorization = '';

    await expect(authenticateUser(req, res as Response, next)).rejects.toThrow(
      CustomAPIError.UnauthenticatedError,
    );

    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should throw an UnauthenticatedError for an invalid token', async () => {
    const invalidToken = 'invalid_token';

    const req = {
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    };

    const res = {};
    const next = jest.fn();

    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    try {
      await authenticateUser(req, res as Response, next);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomAPIError.UnauthenticatedError);
      expect(error.message).toBe('Token Invalid or expired');
    }
    expect(next).not.toHaveBeenCalled();
  });
});
