import { UserModel } from '../../src/models/user.model';
import mongoose from 'mongoose';

describe('User Model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should create a valid user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const user = new UserModel(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  });

  it('should throw error if email is missing', async () => {
    const invalidUser = new UserModel({ name: 'Jane Doe' });

    await expect(invalidUser.save()).rejects.toThrow();
  });
});
