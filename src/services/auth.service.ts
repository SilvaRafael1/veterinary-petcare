import CustomAPIError from '../errors';
import AuthRepository from '../repositories/auth.repository';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthService {
  async login(email: string, password: string) {
    const tutor = await AuthRepository.findByEmail(email);
    if (!tutor) {
      throw new CustomAPIError.UnauthenticatedError('Username or password invalid');
    }

    const isPasswordValid: boolean = await AuthRepository.comparePassword(tutor, password);
    if (!isPasswordValid) {
      throw new CustomAPIError.UnauthenticatedError('Username or password invalid');
    }

    if (process.env.JWT_SECRET) {
      const token: string = jwt.sign({ tutorId: tutor.id }, process.env.JWT_SECRET);
      return token;
    }
    throw new CustomAPIError.NotFoundError('secretKey not found');
  }
}

export default new AuthService();
