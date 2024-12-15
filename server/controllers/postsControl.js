const asyncHandler = require("express-async-handler");
const {createPost, getPosts} = require( "../storages/queries.js")
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
const postsPOST = asyncHandler(async (req, res) => {
  await createPost(100, "the first post", "testing");
  res.send("post created !");
});
const postsGET = asyncHandler(async (req, res) => {
  const posts = await getPosts();
  console.log("posts sent");
  res.json(posts);
});
const postsPUT = asyncHandler(async (req, res) => {
  //do stuff
});
const postsDELETE = asyncHandler(async (req, res) => {
  //do stuff
});

module.exports = { postsPOST, postsGET, postsPUT, postsDELETE };
