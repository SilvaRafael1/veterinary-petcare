import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import supertest from 'supertest';

const testServer = supertest(app);
let tutorId: string;
let petId: string;
let token: string;

beforeAll(async () => {
  const newTutor = {
    name: 'jean',
    password: 'jean123',
    phone: '559999999',
    email: 'jeanteste@gmail.com',
    date_of_birth: '2000-01-12',
    zip_code: '98726000',
  };

  await testServer.post('/tutor').send(newTutor);

  const validCredentials = {
    email: 'jeanteste@gmail.com',
    password: 'jean123',
  };

  const authToken = await testServer.post('/auth').send(validCredentials);
  token = authToken.body.token;
});

describe('Create Pet', () => {
  it('It should be possible to create a pet for a tutor', async () => {
    const id = await testServer.get('/tutors').set('Authorization', `Bearer ${token}`);
    tutorId = id.body[0]._id;
    const newPet = {
      name: 'Boby',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    };
    const expectResponse = {
      name: 'Boby',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    };

    const response = await testServer
      .post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newPet);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(response.body).toEqual(expectResponse);
  });

  it('It should not be possible to create a pet for an already registered tutor', async () => {
    const id = await testServer.get('/tutors').set('Authorization', `Bearer ${token}`);
    tutorId = id.body[0]._id;
    const newPet = {
      name: 'Boby',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    };
    const expectResponse = 'Pet already registered';

    const response = await testServer
      .post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newPet);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.msg).toEqual(expectResponse);
  });

  it('It should not be possible to create pets with unregistered tutors', async () => {
    const newPet = {
      name: 'Bob2',
      species: 'Dog',
      carry: 'p',
      weight: 12,
      date_of_birth: '2021-11-25',
    };
    const expectResponse = 'Tutor not found';
    const tutorId2 = '64c42bdb5453723cd6264232';

    const response = await testServer
      .post(`/pet/${tutorId2}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newPet);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.msg).toEqual(expectResponse);
  });
  describe('Body validation', () => {
    it('It should not be possible to create a new pet with an empty name', async () => {
      const newPet = {
        name: '',
        species: 'Dog',
        carry: 'p',
        weight: 12,
        date_of_birth: '2021-11-25',
      };
      const expectResponse = 'ValidationError:  body.name  is not allowed to be empty';

      const response = await testServer
        .post(`/pet/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to create a new pet with an undefined name', async () => {
      const newPet = {
        species: 'Dog',
        carry: 'p',
        weight: 12,
        date_of_birth: '2021-11-25',
      };
      const expectResponse = 'ValidationError:  body.name  is required';

      const response = await testServer
        .post(`/pet/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to create a new pet with the name being a number', async () => {
      const newPet = {
        name: 123456,
        species: 'Dog',
        carry: 'p',
        weight: 12,
        date_of_birth: '2021-11-25',
      };
      const expectResponse = 'ValidationError:  body.name  must be a string';

      const response = await testServer
        .post(`/pet/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to create a new pet with empty name and carry being number', async () => {
      const newPet = {
        name: '',
        species: 'Dog',
        carry: 123,
        weight: 12,
        date_of_birth: '2021-11-25',
      };
      const expectResponse =
        'ValidationError:  body.name  is not allowed to be empty.  body.carry  must be a string';

      const response = await testServer
        .post(`/pet/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });

  describe('Get All Tutors and Pets', () => {
    it('It should be possible to show registered tutors and their pets', async () => {
      const response = await testServer.get('/tutors').set('Authorization', `Bearer ${token}`);
      petId = response.body[0].pets[0]._id;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(typeof response.body).toEqual('object');
    });
  });

  describe('Update a pet', () => {
    it('It should be possible to change the name of the pet', async () => {
      const updatePet = {
        name: 'Bilu',
      };
      const expectResponse = {
        name: 'Bilu',
        species: 'Dog',
        carry: 'p',
        weight: 12,
        date_of_birth: '2021-11-25',
      };
      const response = await testServer
        .put(`/pet/${petId}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePet);

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(response.body).toEqual(expectResponse);
    });

    it('It should not be possible to change the name of the pet to a empty name', async () => {
      const updatePet = {
        name: '',
      };
      const expectResponse = 'ValidationError:  body.name  is not allowed to be empty';

      const response = await testServer
        .put(`/pet/${petId}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to change the name of the pet name to a number', async () => {
      const updatePet = {
        name: 123456,
      };
      const expectResponse = 'ValidationError:  body.name  must be a string';

      const response = await testServer
        .put(`/pet/${petId}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to update not registered pet', async () => {
      const updatePet = {
        name: 'bibi',
      };
      const expectResponse = 'Pet not found';
      const petId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .put(`/pet/${petId2}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePet);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to change pets with unregistered tutors', async () => {
      const updatePet = {
        name: 'bibi',
      };
      const expectResponse = 'Tutor not found';
      const tutorId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .put(`/pet/${petId}/tutor/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePet);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });

  describe('Delete a tutor', () => {
    it('It should be possible to delete a pet', async () => {
      const response = await testServer
        .delete(`/pet/${petId}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('It should not be possible to delete an unregistered pet', async () => {
      const expectResponse = 'Pet not found';
      const petId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .delete(`/pet/${petId2}/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to delete a pet from a non-registered owner', async () => {
      const expectResponse = 'Tutor not found';
      const tutorId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .delete(`/pet/${petId}/tutor/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });
});
