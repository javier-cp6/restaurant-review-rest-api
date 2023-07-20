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
  .route('/restaurant/comments')
  .get(getAllRestaurantsWithComments);

restaurantRouter
  .route('/restaurant/:id')
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

restaurantRouter
  .route('/restaurant/:id/grade')
  .put(addGradeToRestaurant)

restaurantRouter
  .route('/restaurant/:id/comments')
  .get(getRestaurantByIdWithComments);