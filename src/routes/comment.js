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
  .route('/comments')
  .get(getComments)
  .post(createComment)

commentRouter
  .route('/comments/:id')
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment)