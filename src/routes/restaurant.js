import { Router } from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addGradeToRestaurant,
  getRestaurantByIdWithComments,
  getAllRestaurantsWithComments,
  searchRestaurants,
} from '../controllers/restaurant.js';

export const restaurantRouter = Router();

restaurantRouter
  .route('/restaurants')
  .post(createRestaurant)
  .get(getRestaurants);

restaurantRouter
  .route('/restaurants/comments')
  .get(getAllRestaurantsWithComments);

restaurantRouter
  .route('/restaurants/search')
  .get(searchRestaurants);

restaurantRouter
  .route('/restaurants/:id')
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

restaurantRouter
  .route('/restaurants/:id/grades')
  .put(addGradeToRestaurant)

restaurantRouter
  .route('/restaurants/:id/comments')
  .get(getRestaurantByIdWithComments);