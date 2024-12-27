/*
'/posts':  (CRUD)
    - is the homepage
    -> '/posts/:id/
        - an individual text article

// CRUD operations for '/posts'
// POST /posts: Create a new post
// GET /posts: Retrieve all posts
// PUT /posts/:id: Update a post by ID
// DELETE /posts/:id: Delete a post by ID


*/

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  getComments,
  createComment,
  validateContent,
} = require("../controllers/postsControl.js");
const express = require("express");

const postsRouter = express.Router();
postsRouter.get("/", getAllPosts); //get all posts
postsRouter.post("/", validateContent(true), createPost); //make a post
postsRouter.get("/:id", getPost); //get one post by id
postsRouter.get("/:id/comments", getComments); //get comments by id
postsRouter.post("/:id/comments", validateContent(false), createComment); //CREATE COMMENT



postsRouter.put("/:id", updatePost); //update a post w id
postsRouter.delete("/:id", deletePost); //delete a post w id

module.exports = postsRouter;
