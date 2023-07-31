import Tutor from '../../../src/models/Tutor';
import authRepository from '../../../src/repositories/auth.repository';
import tutorService from '../../../src/services/tutor.service';

describe('Auth Respository', () => {
  describe('Find by email', () => {
    it('Should return a tutor by e-mail input', async () => {
      const tutorData = new Tutor({
        name: 'Rafael',
        password: 'rafael123',
        phone: '559999999',
        email: 'rafael@gmail.com',
        date_of_birth: '2003-07-05',
        zip_code: '98726000',
      });

      await tutorService.createTutor(tutorData);
      const newTutor = await Tutor.findOne({ email: tutorData.email });
      const findTutor = await authRepository.findByEmail(tutorData.email);

      expect(findTutor).toEqual(newTutor);
    });
  });

  describe('Compare Password', () => {
    it('Shoud return true if the password is the same', async () => {
      const tutorData = new Tutor({
        name: 'Rafael',
        password: 'rafael123',
        phone: '559999999',
        email: 'rafael2@gmail.com',
        date_of_birth: '2003-07-05',
        zip_code: '98726000',
      });
      await tutorService.createTutor(tutorData);

      const password = 'rafael123';

      const comparePassword = await authRepository.comparePassword(tutorData, password);

      expect(comparePassword).toBe(true);
    });
  });
});
