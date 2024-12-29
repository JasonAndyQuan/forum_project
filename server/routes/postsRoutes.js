
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  getComments,
  createComment,
  validateContent,
} = require("../controllers/postsController.js");
const express = require("express");

const postsRouter = express.Router();
postsRouter.get("/", getAllPosts); //get all posts
postsRouter.post("/", validateContent(true), createPost); //create a post
postsRouter.get("/:id", getPost); //get a post by its postid
postsRouter.get("/:id/comments", getComments); //get comments by postid
postsRouter.post("/:id/comments", validateContent(false), createComment); //create a comment
postsRouter.delete("/:id", deletePost); //delete a post



postsRouter.put("/:id", updatePost); //update a post

module.exports = postsRouter;
