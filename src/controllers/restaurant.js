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

export const getAllRestaurantsWithComments = async (req, res) => {
  try {
    const restaurantWithComments = await db.collection('restaurants').aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'restaurant_id',
          as: 'comments'
        }
      }
    ]).toArray();

    if (restaurantWithComments.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    return res.json(restaurantWithComments);
  } catch (error) { 
    console.error('Error retrieving restaurant with comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRestaurantByIdWithComments = async (req, res) => {
  const { id } = req.params;
  try {
    const objectIdRestaurantId = new ObjectId(id);
    const restaurantWithComments = await db.collection('restaurants').aggregate([
      {
        $match: { _id: objectIdRestaurantId }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'restaurant_id',
          as: 'comments'
        }
      }
    ]).toArray();

    if (restaurantWithComments.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    return res.json(restaurantWithComments[0]);
  } catch (error) {
    console.error('Error retrieving restaurant with comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchRestaurants = async (req, res) => {
  const { 
    name, 
    cuisine, 
    borough, 
    zipcode, 
    street, 
    latitude, 
    longitude, 
    maxDistanceInMeters 
  } = req.query;
  
  const searchQuery = {}
  const REGEX_OPTIONS = 'i';

  if (name) {
    searchQuery.name = { $regex: name, $options: REGEX_OPTIONS };
  }
  if (cuisine) {
    searchQuery.cuisine = { $regex: cuisine, $options: REGEX_OPTIONS };
  }
  if (borough) {
    searchQuery.borough = { $regex: borough, $options: REGEX_OPTIONS };
  }
  if (street) {
    searchQuery['address.street'] = { $regex: street, $options: REGEX_OPTIONS };
  }
  if (zipcode) {
    searchQuery['address.zipcode'] = { $regex: zipcode, $options: REGEX_OPTIONS };
  }
  if (latitude && longitude && maxDistanceInMeters) {
    searchQuery['address.coord'] = {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
        $maxDistance: parseInt(maxDistanceInMeters)
      }
    };
  }
  
  try {
    const result = await db.collection('restaurants').find(searchQuery).toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error searching restaurants by coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};