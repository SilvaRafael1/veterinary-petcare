import Pet from '../../../src/models/Pet';
import Tutor from '../../../src/models/Tutor';
import tutorService from '../../../src/services/tutor.service';
import petRepository from '../../../src/repositories/pet.repository';

let tutor_Id: string;
let pet_Id: string;

describe('Pet Repositories', () => {
  describe('Create Pet', () => {
    it('Should create a new pet', async () => {
      const petData = new Pet({
        name: 'Lilo',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
      });

      const newPet = await petRepository.create(petData);

      expect(newPet).toEqual(petData);
    });
  });

  describe('Find By Name', () => {
    it('Should find a pet by the tutor ID and name', async () => {
      const tutorData = new Tutor({
        name: 'jean',
        password: 'jean123',
        phone: '559999999',
        email: 'jean@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      });
      await tutorService.createTutor(tutorData);
      const tutor = await Tutor.findOne({ email: 'jean@gmail.com' });
      tutor_Id = tutor?._id;

      const petData = new Pet({
        name: 'Bigode',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
      });
      petData.tutor = tutor?._id;
      await petRepository.create(petData);

      const pet = await Pet.findOne({ name: 'Bigode', date_of_birth: '1993-12-12 10:10' });
      pet_Id = pet?._id;

      const expectResponse = {
        _id: pet_Id,
        name: 'Bigode',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
        tutor: tutor_Id,
        __v: 0,
      };

      const petFindByName = await petRepository.findByName(tutor_Id, 'Bigode');

      expect(petFindByName).toMatchObject(expectResponse);
    });
  });

  describe('Find By Id', () => {
    it('Should return a pet by tutorId and petId', async () => {
      const expectResponse = {
        _id: pet_Id,
        name: 'Bigode',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
        tutor: tutor_Id,
        __v: 0,
      };

      const pet = await petRepository.findById(tutor_Id, pet_Id);

      expect(pet).toMatchObject(expectResponse);
    });
  });

  describe('Find By Tutor Id', () => {
    it('Should find a pet by tutorId', async () => {
      const expectResponse = [
        {
          _id: pet_Id,
          name: 'Bigode',
          species: 'dog',
          carry: 'p',
          weight: 5,
          date_of_birth: '1993-12-12 10:10',
          tutor: tutor_Id,
          __v: 0,
        },
      ];

      const pet = await petRepository.findByTutorId(tutor_Id);

      expect(pet).toMatchObject(expectResponse);
    });
  });

  describe('Update Pet', () => {
    it('Should update a pet', async () => {
      const expectResponse = {
        _id: pet_Id,
        name: 'Bigode',
        species: 'cat',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
        tutor: tutor_Id,
        __v: 0,
      };

      const updatePetData = new Pet({
        species: 'cat',
      });
      updatePetData._id = pet_Id;

      const pet = await petRepository.update(updatePetData, pet_Id);

      expect(pet).toMatchObject(expectResponse);
    });
  });

  describe('Delete Pet', () => {
    it('Should delete a pet by tutorId and petId', async () => {
      const pet = await petRepository.deleteOne(tutor_Id, pet_Id);

      expect(pet).toBeUndefined();
    });
  });
});
