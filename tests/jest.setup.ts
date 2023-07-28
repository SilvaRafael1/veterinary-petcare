import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export async function connectTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const mongoURI = mongoServer.getUri();

  await mongoose.connect(mongoURI);
}

export async function closeTestDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});
