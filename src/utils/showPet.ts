import { PetInterface } from '../models/Pet';

const formatPetToShow = (updatePet: PetInterface) => {
  const petShow = {
    name: updatePet.name,
    species: updatePet.species,
    carry: updatePet.carry,
    weight: updatePet.weight,
    date_of_birth: updatePet.date_of_birth,
  };
  return petShow;
};

export { formatPetToShow };
