import { tutorInterfaceShow, formatTutorToShow } from '../../../src/utils/showTutor';

describe('Show Tutor', () => {
  it('It should be possible to format the response result', () => {
    const mockPet: tutorInterfaceShow = {
      name: 'Alberto',
      password: '123456',
      phone: '123456789',
      email: 'jean@gmail.com',
      date_of_birth: '2021-11-25',
      zip_code: '98726000',
    };
    const result = formatTutorToShow(mockPet);

    expect(result).toEqual({
      name: 'Alberto',
      phone: '123456789',
      email: 'jean@gmail.com',
      date_of_birth: '2021-11-25',
      zip_code: '98726000',
    });
  });
});
