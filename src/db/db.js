import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

const connect = async () => {
  try {
    await client.connect();
    db = client.db()
    console.log('Connected to MongoDB');
    // return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export { connect, db };