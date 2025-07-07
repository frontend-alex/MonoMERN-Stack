import { User } from '../models/User';
import mongoose from 'mongoose';

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create and save a user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });
});