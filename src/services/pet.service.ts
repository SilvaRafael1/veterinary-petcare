import CustomAPIError from '../errors';
import PetRepository from '../repositories/pet.repository';
import TutorRepository from '../repositories/tutor.repository';
import Pet from '../models/Pet';
import { PetInterface } from '../models/Pet';
// import { validatePetDataCreate, validatePetDataUpdate } from '../utils/petRequiredFields';
class PetService {
  private async checkDuplicateName(tutorId: string, name: string) {
    const existingPet = await PetRepository.findByName(tutorId, name);

    if (existingPet) {
      throw new CustomAPIError.BadRequestError('Pet already registered');
    }
  }
  async createPet(tutorId: string, petData: PetInterface) {
    // validatePetDataCreate(petData);
    const tutor = await TutorRepository.findById(tutorId);

    if (!tutor) {
      throw new CustomAPIError.BadRequestError('Tutor not found');
    }

    await this.checkDuplicateName(tutorId, petData.name);

    const pet = new Pet({ ...petData, tutor: tutorId });

    const createdPet = await PetRepository.create(pet);
    tutor.pets.push(createdPet._id);
    await TutorRepository.save(tutor);

    return pet;
  }

  async deletePet(tutorId: string, petId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    const existingPet = await PetRepository.findById(tutorId, petId);

    if (!existingPet) {
      throw new CustomAPIError.BadRequestError('Pet not found');
    }

    await PetRepository.deleteOne(tutorId, petId);
  }

  async updatePet(petData: PetInterface, petId: string, tutorId: string) {
    // validatePetDataUpdate(petData);
    const existingTutor = await TutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    const existingPet = await PetRepository.findById(tutorId, petId);

    if (!existingPet) {
      throw new CustomAPIError.BadRequestError('Pet not found');
    }

    const updatePet = await PetRepository.update(petData, petId);

    if (updatePet) {
      const tutorShow = {
        name: updatePet.name,
        species: updatePet.species,
        carry: updatePet.carry,
        weight: updatePet.weight,
        date_of_birth: updatePet.date_of_birth,
      };
      return tutorShow;
    }
    throw new CustomAPIError.BadRequestError('Pet not updated');
  }
}

export default new PetService();
