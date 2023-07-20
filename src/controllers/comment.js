import { ObjectId } from 'mongodb';
import { db } from '../db/db.js';

export const getComments = async (req, res) => {
  try {
    const comments = await db.collection('comments').find().toArray();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:',  error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(id) });

    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error getting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createComment = async (req, res) => {
  const { userId, restaurantId } = req.query;
  const { comment, rating }   = req.body;

  const commentDoc = {
    _id: new ObjectId(),
    restaurant_id: new ObjectId(restaurantId),
    user_id: new ObjectId(userId),
    date: new Date(),
    comment,
    rating,
  }

  try {
    const result = await db.collection('comments').insertOne(commentDoc);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment, rating }   = req.body;

  const commentDoc = {
    date: new Date(),
    comment,
    rating,
  }

  try {
    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(id) },
      { $set: commentDoc }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Comment updated successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection('comments').deleteOne(
      { _id: new ObjectId(id) },
    );

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};