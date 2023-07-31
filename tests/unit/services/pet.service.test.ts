import { StatusCodes } from 'http-status-codes';
import Pet from '../../../src/models/Pet';
import Tutor from '../../../src/models/Tutor';
import { formatPetToShow } from '../../../src/utils/showPet';
import petService from '../../../src/services/pet.service';
import tutorService from '../../../src/services/tutor.service';
import petRepository from '../../../src/repositories/pet.repository';

let tutorId: string;

describe('Pet Service', () => {
  describe('Create Pet', () => {
    it('Should be possible to create a new pet', async () => {
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
      tutorId = tutor?._id;

      const petData = new Pet({
        name: 'Lilo',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
      });

      const newPet = await petService.createPet(tutorId, petData);
      const expectResponse = formatPetToShow(petData);

      expect(newPet).toEqual(expectResponse);
    });

    it('Pet already created', async () => {
      async function expectError() {
        const petData = new Pet({
          name: 'Lilo',
          species: 'dog',
          carry: 'p',
          weight: 5,
          date_of_birth: '1993-12-12 10:10',
        });

        await petService.createPet(tutorId, petData);
      }

      try {
        await expectError();
      } catch (err: any) {
        expect(err).toBeInstanceOf(Error);
        expect(err.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      }
    });
  });

  describe('Delete Pet', () => {
    it('Should delete a pet by ID', async () => {
      const petData = new Pet({
        name: 'Amarelo',
        species: 'cat',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
      });
      await petService.createPet(tutorId, petData);
      const newPet = await petRepository.findByName(tutorId, petData.name);
      const petId = newPet?._id;

      const deletePet = await petService.deletePet(tutorId, petId);

      expect(deletePet).toBeUndefined();
    });
  });

  describe('Update Pet', () => {
    it('Should update a pet by ID', async () => {
      const newPet = new Pet({
        name: 'Bolinha',
        species: 'dog',
        carry: 'p',
        weight: 5,
        date_of_birth: '1993-12-12 10:10',
      });
      const expectResponse = formatPetToShow(newPet);

      const pet = await petRepository.findByName(tutorId, 'Lilo');
      const petId = pet?._id;
      const updatePetData = new Pet({
        name: 'Bolinha',
      });
      updatePetData._id = petId;

      const updatedPet = await petService.updatePet(updatePetData, petId, tutorId);

      expect(updatedPet).toEqual(expectResponse);
    });
  });
});
