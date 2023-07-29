import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import supertest from 'supertest';

const testServer = supertest(app);
let tutorId: string;
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

  const response = await testServer.post('/auth').send(validCredentials);
  token = response.body.token;
});

describe('Create Tutor', () => {
  it('Should must be possible to register a  new tutor', async () => {
    const newTutor = {
      name: 'jean',
      password: 'jean123',
      phone: '559999999',
      email: 'jean@gmail.com',
      date_of_birth: '2000-01-12',
      zip_code: '98726000',
    };
    const expectResponse = {
      name: 'jean',
      phone: '559999999',
      email: 'jean@gmail.com',
      date_of_birth: '2000-01-12',
      zip_code: '98726000',
    };

    const response = await testServer.post('/tutor').send(newTutor);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(response.body).toEqual(expectResponse);
  });

  it('It should not be possible to register a new tutor with an already registered email', async () => {
    const newTutor = {
      name: 'jean',
      password: 'jean123',
      phone: '559999999',
      email: 'jean@gmail.com',
      date_of_birth: '2000-01-12',
      zip_code: '98726000',
    };
    const expectResponse = 'tutor already registered';

    const response = await testServer.post('/tutor').send(newTutor);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.msg).toEqual(expectResponse);
  });

  describe('Body validation', () => {
    it('It should not be possible to register a new tutor with an empty name', async () => {
      const newTutor = {
        name: '',
        password: 'jean123',
        phone: '559999999',
        email: 'jean2@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse = 'ValidationError:  body.name  is not allowed to be empty';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to register a new tutor with an undefined name', async () => {
      const newTutor = {
        password: 'jean123',
        phone: '559999999',
        email: 'jean2@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse = 'ValidationError:  body.name  is required';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to register a new tutor with the name being a number', async () => {
      const newTutor = {
        name: 123456,
        password: 'jean123',
        phone: '559999999',
        email: 'jean2@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse = 'ValidationError:  body.name  must be a string';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to register a new tutor with empty name and email being number', async () => {
      const newTutor = {
        name: '',
        password: 'jean123',
        phone: '559999999',
        email: 123,
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse =
        'ValidationError:  body.name  is not allowed to be empty.  body.email  must be a string';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to register a new tutor with an invalid email', async () => {
      const newTutor = {
        name: 'jean',
        password: 'jean123',
        phone: '559999999',
        email: 'jean2@gmail.co',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse = 'ValidationError:  body.email  must be a valid email';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to register a new tutor with the password less than 6 characters long', async () => {
      const newTutor = {
        name: 'jean',
        password: 'jean',
        phone: '559999999',
        email: 'jean2@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const expectResponse =
        'ValidationError:  body.password  length must be at least 6 characters long';

      const response = await testServer.post('/tutor').send(newTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });

  describe('Get All Tutors', () => {
    it('It should be possible to show registered tutors', async () => {
      const response = await testServer.get('/tutors').set('Authorization', `Bearer ${token}`);
      tutorId = response.body[0]._id;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(typeof response.body).toEqual('object');
    });
  });

  describe('Update a tutor', () => {
    it('It should be possible to change the name of the tutor', async () => {
      const updateTutor = {
        name: 'jeanFelipe',
      };
      const expectResponse = {
        name: 'jeanFelipe',
        phone: '559999999',
        email: 'jeanteste@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };
      const response = await testServer
        .put(`/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateTutor);

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(response.body).toEqual(expectResponse);
    });

    it('It should not be possible to change the name of the tutor to a empty name', async () => {
      const updateTutor = {
        name: '',
        phone: '559999999',
      };
      const expectResponse = 'ValidationError:  body.name  is not allowed to be empty';

      const response = await testServer
        .put(`/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to change the tutor name to a number', async () => {
      const updateTutor = {
        name: 123456,
        phone: '559999999',
      };
      const expectResponse = 'ValidationError:  body.name  must be a string';

      const response = await testServer
        .put(`/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateTutor);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to update not registered tutors', async () => {
      const updateTutor = {
        name: 'felipe',
        phone: '559999999',
      };
      const expectResponse = 'Tutor not found';
      const tutorId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .put(`/tutor/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateTutor);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });

  describe('Delete a tutor', () => {
    it('It should be possible to delete registered tutors', async () => {
      const response = await testServer
        .delete(`/tutor/${tutorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('It should not be possible to delete not registered tutors', async () => {
      const expectResponse = 'Tutor not found';
      const tutorId2 = '64c42bdb5453723cd6264232';

      const response = await testServer
        .delete(`/tutor/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.msg).toEqual(expectResponse);
    });

    it('It should not be possible to delete a tutor with a pet associated with it', async () => {
      const newTutor = {
        name: 'jean',
        password: 'jean123',
        phone: '559999999',
        email: 'jeanteste@gmail.com',
        date_of_birth: '2000-01-12',
        zip_code: '98726000',
      };

      await testServer.post('/tutor').send(newTutor);
      const responseId = await testServer.get('/tutors').set('Authorization', `Bearer ${token}`);
      const tutorId2 = responseId.body[0]._id;

      const newPet = {
        name: 'Boby',
        species: 'Dog',
        carry: 'p',
        weight: 12,
        date_of_birth: '2021-11-25',
      };

      await testServer
        .post(`/pet/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPet);

      const expectResponse = 'Tutor has associated pets and cannot be deleted';

      const response = await testServer
        .delete(`/tutor/${tutorId2}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.msg).toEqual(expectResponse);
    });
  });
});
