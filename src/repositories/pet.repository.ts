import Pet from '../models/Pet';
import { PetInterface } from '../models/Pet';
class PetRepository {
  async create(pet: PetInterface) {
    return await pet.save();
  }
  async findByName(tutorId: string, name: string) {
    const pet = await Pet.findOne({ tutor: tutorId, name });
    return pet;
  }
}

export default new PetRepository();
