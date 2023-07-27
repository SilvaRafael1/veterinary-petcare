import CustomAPIError from '../errors';
import PetRepository from '../repositories/pet.repository';
import TutorRepository from '../repositories/tutor.repository';
import Pet from '../models/Pet';
import { PetInterface } from '../models/Pet';
// import { validatePetDataCreate, validatePetDataUpdate } from '../utils/petRequiredFields';
class PetService {
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

  private async checkDuplicateName(tutorId: string, name: string) {
    const existingPet = await PetRepository.findByName(tutorId, name);

    if (existingPet) {
      throw new CustomAPIError.BadRequestError('Pet already registered');
    }
  }
}

export default new PetService();
