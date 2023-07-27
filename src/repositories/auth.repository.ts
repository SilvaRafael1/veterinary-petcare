import Tutor from '../models/Tutor';
import { TutorInterface } from '../models/Tutor';
import bcryptjs from 'bcryptjs';

class AuthRepository {
  async findByEmail(email: string) {
    const tutor = await Tutor.findOne({ email });
    return tutor;
  }

  async comparePassword(tutor: TutorInterface, password: string) {
    const isPasswordValid: boolean = await bcryptjs.compare(password, tutor.password);
    return isPasswordValid;
  }
}

export default new AuthRepository();
