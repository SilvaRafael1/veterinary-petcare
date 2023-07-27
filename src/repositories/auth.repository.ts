import Tutor from '../models/Tutor';
import { TutorInterface } from '../models/Tutor';

class AuthRepository {
  async findByEmail(email: string) {
    const tutor = await Tutor.findOne({ email });
    return tutor;
  }

  async comparePassword(tutor: TutorInterface, password: string) {
    const isPasswordValid: boolean = await tutor.comparePassword(password);
    return isPasswordValid;
  }
}

export default new AuthRepository();
