import { Router } from "express";
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.js';

export const commentRouter = Router();

commentRouter
  .route('/comment')
  .get(getComments)

commentRouter
  .route('/comment/:userId')
  .get(getCommentById)
  .post(createComment)
  .put(updateComment)
  .delete(deleteComment)