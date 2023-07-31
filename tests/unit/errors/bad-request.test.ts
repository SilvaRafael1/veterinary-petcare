import StatusCodes from 'http-status-codes';
import BadRequestError from '../../../src/errors/bad-request';

describe('BadRequestError', () => {
  it('should create an instance of BadRequestError correctly', () => {
    const message = 'Invalid request error';
    const badRequestError = new BadRequestError(message);

    expect(badRequestError).toBeInstanceOf(BadRequestError);
    expect(badRequestError.message).toBe(message);
    expect(badRequestError.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
