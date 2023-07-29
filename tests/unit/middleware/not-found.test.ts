import { Request, Response } from 'express';
import notFound from '../../../src/middleware/not-found';

describe('notFound', () => {
  it('Should return status 404', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    notFound(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('Should send the message "Route does not exist"', () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    notFound(req as Request, res as Response);

    expect(res.send).toHaveBeenCalledWith('Route does not exist');
  });
});
