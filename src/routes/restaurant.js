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

restaurantRouter
  .route('/restaurant_comments')
  .get(getAllRestaurantsWithComments);

restaurantRouter
  .route('/restaurant_comments/:restaurantId')
  .get(getRestaurantByIdWithComments);