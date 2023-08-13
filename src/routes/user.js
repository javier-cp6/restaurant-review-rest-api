import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByIdWithComments,
} from '../controllers/user.js';

export const userRouter = Router();

userRouter
  .route('/users')
  .post(createUser)
  .get(getUsers);

userRouter
  .route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

userRouter
  .route('/users/:id/comments')
  .get(getUserByIdWithComments)