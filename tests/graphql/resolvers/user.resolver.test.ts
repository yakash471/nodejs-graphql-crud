import { userResolvers } from '../../../src/graphql/resolvers/user.resolver';
import { UserModel } from '../../../src/models/user.model';
import mongoose from 'mongoose';

// Mock the UserModel before running tests
jest.mock('../../../src/models/user.model');

// Type casting for the Mongoose methods to allow Jest mocks
const mockedFind = UserModel.find as jest.Mock;
const mockedFindById = UserModel.findById as jest.Mock;
const mockedSave = UserModel.prototype.save as jest.Mock;
const mockedFindByIdAndUpdate = UserModel.findByIdAndUpdate as jest.Mock;
const mockedFindByIdAndDelete = UserModel.findByIdAndDelete as jest.Mock;

describe('User Resolvers', () => {
  // Mock connection before tests (optional, can be skipped if you're not testing DB)
  beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      { _id: '1', name: 'John Doe', email: 'john@example.com' },
      { _id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];

    // Mock the find method to return the mock data
    mockedFind.mockResolvedValue(mockUsers);
    const result = await userResolvers.Query.users();

    expect(result).toEqual(mockUsers);
  });

  it('should fetch a single user by id', async () => {
    const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com' };

    // Mock findById method to return the mock user
    mockedFindById.mockResolvedValue(mockUser);
    const result = await userResolvers.Query.user(null, { id: '1' });

    expect(result).toEqual(mockUser);
  });

  it('should create a user', async () => {
    const mockUser = { _id: '3', name: 'Alice', email: 'alice@example.com' };

    // Mock save method
    mockedSave.mockResolvedValue(mockUser);
    const result = await userResolvers.Mutation.createUser(null, {
      name: 'Alice',
      email: 'alice@example.com',
    });

    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updatedUser = {
      _id: '1',
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    // Mock findByIdAndUpdate method
    mockedFindByIdAndUpdate.mockResolvedValue(updatedUser);
    const result = await userResolvers.Mutation.updateUser(null, {
      id: '1',
      name: 'John Updated',
      email: 'john.updated@example.com',
    });

    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    const userId = '1';

    // Mock findByIdAndDelete method
    mockedFindByIdAndDelete.mockResolvedValue(true);
    const result = await userResolvers.Mutation.deleteUser(null, {
      id: userId,
    });

    expect(result).toBe(`User with ID ${userId} deleted`);
  });
});
