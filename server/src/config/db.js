import mongoose from 'mongoose';

const resolveMongoUri = () => {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGODB_URL ||
    ''
  );
};

const connectDB = async () => {
  try {
    const uri = resolveMongoUri();
    if (!uri || typeof uri !== 'string') {
      throw new Error('Missing MongoDB connection string. Set MONGODB_URI (or MONGO_URI/DATABASE_URL) in environment.');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;