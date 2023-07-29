import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TutorModel, { TutorInterface } from '../../../src/models/Tutor';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Tutor Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('TutorSchema.pre("save")', () => {
    it('must encrypt password before saving', async () => {
      const password = 'password123';
      const tutor: TutorInterface = new TutorModel({
        name: 'John Doe',
        password,
        phone: '1234567890',
        email: 'john@example.com',
        date_of_birth: '1990-01-01',
        zip_code: '12345-678',
        pets: [],
      });

      await tutor.save();

      expect(tutor.password).not.toEqual(password);

      const isPasswordMatch = await bcrypt.compare(password, tutor.password);
      expect(isPasswordMatch).toBe(true);
    });
  });

  describe('TutorSchema.methods.createJWT()', () => {
    it('Should create JWT token correctly', () => {
      const tutor: TutorInterface = new TutorModel({
        name: 'John Doe',
        password: 'password123',
        phone: '1234567890',
        email: 'john@example.com',
        date_of_birth: '1990-01-01',
        zip_code: '12345-678',
        pets: [],
      });

      const jwtSecret = process.env.JWT_SECRET || 'default_secret';
      const expiresIn = process.env.JWT_LIFETIME || '1h';

      const signMock = jwt.sign as jest.Mock;
      signMock.mockReturnValue('jwt-token');

      const token = tutor.createJWT();

      expect(signMock).toHaveBeenCalledWith(
        { userId: tutor._id.toString(), name: tutor.name },
        jwtSecret,
        { expiresIn },
      );

      expect(token).toEqual('jwt-token');
    });
  });
});
