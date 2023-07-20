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
  .post(createComment)

commentRouter
  .route('/comment/:id')
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment)