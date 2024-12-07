import asyncHandler from "express-async-handler";
import { createPost } from "../storages/queries.js";
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
const postsPOST = asyncHandler( async (req, res) => {
  await createPost(100, "the first post", "testing")
  res.send("post created !");
});
const postsGET = asyncHandler((req, res) => {
  console.log(" I am posts GET");
  res.json([
    { id: 1, title: "First Blog Post" },
    { id: 2, title: "Second Blog Post" },
  ]);
  //do stuff
});
const postsPUT = asyncHandler((req, res) => {
  //do stuff
});
const postsDELETE = asyncHandler((req, res) => {
  //do stuff
});

export { postsPOST, postsGET, postsPUT, postsDELETE };
