import Tutor from '../../../src/models/Tutor';
import tutorService from '../../../src/services/tutor.service';
import authService from '../../../src/services/auth.service';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

describe('Auth Services', () => {
  it('Should return the login token', async () => {
    const tutorData = new Tutor({
      name: 'Rafael',
      password: 'rafael123',
      phone: '559999999',
      email: 'rafael@gmail.com',
      date_of_birth: '2003-07-05',
      zip_code: '98726000',
    });
    await tutorService.createTutor(tutorData);
    const email = tutorData.email;
    const password = 'rafael123';

    const token = await authService.login(email, password);

    const expectResponse = await jwt.sign({ tutorId: tutorData._id }, process.env.JWT_SECRET);

    expect(token).toEqual(expectResponse);
  });
});
