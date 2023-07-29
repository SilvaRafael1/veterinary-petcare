import Pet from '../models/Pet';
import { formatPetToShow } from './showPet';

describe('Show Pet', () => {
  it('Should show pet details without id', async () => {
    const petData = new Pet({
      name: 'Lilo',
      species: 'dog',
      carry: 'p',
      weight: 5,
      date_of_birth: '1993-12-12 10:10',
    });
    const expectResponse = formatPetToShow(petData);

    expect(petData).toMatchObject(expectResponse);
  });
});
