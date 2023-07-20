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
  .route('/user')
  .post(createUser)
  .get(getUsers);

userRouter
  .route('/user/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

userRouter
  .route('/user/:id/comments')
  .get(getUserByIdWithComments)