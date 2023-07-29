import StatusCodes from 'http-status-codes';
import UnauthenticatedError from '../../../src/errors/unauthenticated';

describe('NotFoundError', () => {
  it('should create an instance of NotFoundError correctly', () => {
    const message = 'Invalid request error';
    const badRequestError = new UnauthenticatedError(message);

    expect(badRequestError).toBeInstanceOf(UnauthenticatedError);
    expect(badRequestError.message).toBe(message);
    expect(badRequestError.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});
