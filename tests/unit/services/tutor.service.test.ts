import Tutor from '../../../src/models/Tutor';
import { formatTutorToShow } from '../../../src/utils/showTutor';
import tutorService from '../../../src/services/tutor.service';

let tutor_Id: string;

describe('Tutor Service', () => {
  it('Should return all tutors', async () => {
    const allTutors = await tutorService.getAllTutors();
    const expectResponse = await Tutor.find({}, { password: 0 }).populate({ path: 'pets' });

    expect(allTutors).toEqual(expectResponse);
  });

  it('Should create a new tutor', async () => {
    const tutorData = new Tutor({
      name: 'Rafael',
      password: 'rafael123',
      phone: '559999999',
      email: 'rafael@gmail.com',
      date_of_birth: '2003-07-05',
      zip_code: '98726000',
    });
    const newTutor = await tutorService.createTutor(tutorData);
    tutor_Id = tutorData._id;

    const expectResponse = formatTutorToShow(tutorData);

    expect(newTutor).toMatchObject(expectResponse);
  });

  it('Should update a tutor', async () => {
    const updatedTutor = new Tutor({
      name: 'Rafael',
      password: 'rafael123',
      phone: '559999999',
      email: 'rafael2@gmail.com',
      date_of_birth: '2003-07-05',
      zip_code: '98726000',
    });
    updatedTutor._id = tutor_Id;
    const expectResponse = formatTutorToShow(updatedTutor);

    const tutor = await tutorService.updateTutor(updatedTutor, tutor_Id);

    expect(tutor).toEqual(expectResponse);
  });

  it('Should delete a tutor', async () => {
    const deleteTutor = await tutorService.deleteTutor(tutor_Id);
    expect(deleteTutor).toBeUndefined();
  });
});
