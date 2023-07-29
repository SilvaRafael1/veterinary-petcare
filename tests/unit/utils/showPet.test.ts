import { PetInterfaceShow, formatPetToShow } from '../../../src/utils/showPet';

describe('Show Pet', () => {
  it('It should be possible to format the response result', () => {
    const mockPet: PetInterfaceShow = {
      name: 'Alberto',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    };
    const result = formatPetToShow(mockPet);

    expect(result).toEqual({
      name: 'Alberto',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    });
  });
});
