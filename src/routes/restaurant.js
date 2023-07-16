import { Router } from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addGradeToRestaurant,
} from '../controllers/restaurant.js';

export const restaurantRouter = Router();

restaurantRouter
  .route('/restaurant')
  .post(createRestaurant)
  .get(getRestaurants);

restaurantRouter
  .route('/restaurant/:id')
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

restaurantRouter
  .route('/restaurant_grade/:id')
  .put(addGradeToRestaurant)