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
  postsPOST,
  postsGET,
  postsPUT,
  postsDELETE,
  postSingle,
  postComments,
  postCommentsPost,
  validateContent,
} = require("../controllers/postsControl.js");
const express = require("express");

const postsRouter = express.Router();
postsRouter.get("/", postsGET); //get all posts
postsRouter.post("/", validateContent(true), postsPOST); //make a post
postsRouter.get("/:id", postSingle); //get one post by id
postsRouter.get("/:id/comments", postComments); //get comments by id
postsRouter.post("/:id/comments", validateContent(false), postCommentsPost); //CREATE COMMENT

postsRouter.put("/:id", postsPUT); //update a post w id
postsRouter.delete("/:id", postsDELETE); //delete a post w id

module.exports = postsRouter;
