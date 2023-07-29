export interface PetInterfaceShow {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth?: string;
}
const formatPetToShow = (pet: PetInterfaceShow) => {
  const petShow = {
    name: pet.name,
    species: pet.species,
    carry: pet.carry,
    weight: pet.weight,
    date_of_birth: pet.date_of_birth,
  };
  return petShow;
};

export { formatPetToShow };
