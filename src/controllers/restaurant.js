import { ObjectId } from 'mongodb';
import { db } from '../db/db.js';

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await db.collection('restaurants').find().toArray();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await db.collection('restaurants').findOne({ _id: new ObjectId(id) });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error getting restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const result = await db.collection('restaurants').insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('restaurants').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Restaurant updated successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('restaurants').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addGradeToRestaurant = async (req, res) => {
  const { id } = req.params;
  const score = req.body;
  score.date = new Date();

  try {
    const result = await db.collection('restaurants').updateOne(
      { _id: new ObjectId(id) },
      { $push: { grades: score } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Restaurant updated successfully' });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};