import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp'; // Mongo URI from environment variable or localhost
    await mongoose.connect(dbUri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
