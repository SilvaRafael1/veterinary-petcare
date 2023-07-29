import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import supertest from 'supertest';

const testServer = supertest(app);

beforeAll(async () => {
  const newTutor = {
    name: 'jean',
    password: 'jean123',
    phone: '559999999',
    email: 'jean@gmail.com',
    date_of_birth: '2000-01-12',
    zip_code: '98726000',
  };

  await testServer.post('/tutor').send(newTutor);
});

describe('Auth Tutor', () => {
  it('should authenticate a user with valid credentials', async () => {
    const validCredentials = {
      email: 'jean@gmail.com',
      password: 'jean123',
    };

    const response = await testServer.post('/auth').send(validCredentials);

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.token).toBeDefined();
  });

  it('should not authenticate a user with invalid email', async () => {
    const validCredentials = {
      email: 'jean2@gmail.com',
      password: 'jean123',
    };

    const response = await testServer.post('/auth').send(validCredentials);

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body.token).toBeUndefined();
  });

  it('should not authenticate a user with invalid password', async () => {
    const validCredentials = {
      email: 'jean@gmail.com',
      password: 'jean1234',
    };

    const response = await testServer.post('/auth').send(validCredentials);

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body.token).toBeUndefined();
  });
});
