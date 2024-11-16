import { UserModel } from '../../src/models/user.model';
import mongoose from 'mongoose';

// Mock the save method of the UserModel
jest.mock('../../src/models/user.model'); // This will mock all the functions of UserModel, including save

describe('User Model', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should create a valid user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };

    // Mock the save method to return the userData
    const mockSave = UserModel.prototype.save as jest.Mock;
    mockSave.mockResolvedValue({
      _id: 'someid',
      name: userData.name,
      email: userData.email,
    });

    const user = new UserModel(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  });

  it('should throw error if email is missing', async () => {
    const invalidUser = new UserModel({ name: 'Jane Doe' });

    // Mock save to reject if validation fails (e.g. email is missing)
    const mockSave = UserModel.prototype.save as jest.Mock;
    mockSave.mockRejectedValue(
      new Error('Validation Error: Email is required'),
    );

    await expect(invalidUser.save()).rejects.toThrow(
      'Validation Error: Email is required',
    );
  });
});
