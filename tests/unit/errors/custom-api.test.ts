import CustomAPIError from '../../../src/errors/custom-api';

describe('CustomAPIError', () => {
  it('should create an instance of BadRequestError correctly', () => {
    const errorMessage = 'Invalid request error';
    const customAPIError = new CustomAPIError(errorMessage);

    expect(customAPIError).toBeInstanceOf(CustomAPIError);
    expect(customAPIError).toBeInstanceOf(Error);
    expect(customAPIError.message).toBe(errorMessage);
  });
});
