import { ObjectId } from 'mongodb';
import { db } from '../db/db.js';

export const getUsers = async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const result = await db.collection('users').insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserByIdWithComments = async (req, res) => {
  const { id } = req.params;
  try {
    const objectIduserId = new ObjectId(id);
    const userWithComments = await db.collection('users').aggregate([
      {
        $match: { _id: objectIduserId }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'user_id',
          as: 'comments'
        }
      }
    ]).toArray();

    if (userWithComments.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(userWithComments[0]);
  } catch (error) {
    console.error('Error retrieving user with comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};