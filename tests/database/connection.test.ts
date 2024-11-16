import { connectToDatabase } from '../../src/database/connection';
import mongoose from 'mongoose';

describe('MongoDB Connection', () => {
  it('should connect to MongoDB', async () => {
    await expect(connectToDatabase()).resolves.not.toThrow();
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });
});
