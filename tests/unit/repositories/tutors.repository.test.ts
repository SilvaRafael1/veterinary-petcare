import Tutor, { TutorInterface } from '../../../src/models/Tutor';
import tutorService from '../../../src/services/tutor.service';
import tutorRepository from '../../../src/repositories/tutor.repository';

let tutor_Id: string;
let tutorTest: TutorInterface;

beforeAll(async () => {
  tutorTest = new Tutor({
    name: 'jean',
    password: 'jean123',
    phone: '559999999',
    email: 'jeanTest@gmail.com',
    date_of_birth: '2000-01-12',
    zip_code: '98726000',
  });

  await tutorService.createTutor(tutorTest);

  const tutor = await Tutor.findOne({ email: 'jean2@gmail.com' });
  tutor_Id = tutor?._id;
});

describe('Tutors Repositories', () => {
  describe('Create Tutor', () => {
    it('Should create a new tutor', async () => {
      const tutorData = new Tutor({
        name: 'jean',
        password: 'jean123',
        phone: '559999999',
        email: 'jean@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      });

      const newPet = await tutorRepository.create(tutorData);

      expect(newPet).toEqual(tutorData);
    });
  });

  describe('Find By ID', () => {
    it('Should find a tutor by the tutor ID', async () => {
      const tutorResponse = await tutorRepository.findById(tutor_Id);

      if (tutorResponse) {
        expect(tutorTest).toBe(tutorResponse);
      }
    });
  });

  describe('Delete Tutor', () => {
    it('Should delete a tutor by tutorId', async () => {
      const pet = await tutorRepository.deleteOne(tutor_Id);
      expect(pet).toBeUndefined();
    });
  });

  describe('Save Tutor', () => {
    it('Should save a tutor to the database', async () => {
      const tutorToSave = new Tutor({
        name: 'New Tutor',
        password: 'password123',
        phone: '5544444444',
        email: 'newtutor@gmail.com',
        date_of_birth: '1990-10-20',
        zip_code: '54321000',
      });

      const savedTutor = await tutorRepository.save(new Tutor(tutorToSave));

      expect(savedTutor).toBeTruthy();
    });
  });
});
