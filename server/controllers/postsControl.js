const asyncHandler = require("express-async-handler");
const {
  createPost,
  getPosts,
  getPostSingle,
  getComments,
  createComment,
} = require("../storages/queries.js");
const { body, validationResult } = require("express-validator");
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

//post : 1000 char
//comment : 300 char
//post.title: 50 char

const validateContent = (isPost) => {
  const validations = [
    body("content")
      .trim()
      .isLength({ min: 1, max: isPost ? 1000 : 300 })
      .withMessage(`Content must be 1 - ${isPost ? "1000" : "300"} characters.`)
      .escape(),
  ];
  if (isPost) {
    validations.push(
      body("title")
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage("Title must be 1 - 50 characters.")
        .escape()
    );
  }
  return validations;
};

const postsPOST = asyncHandler(async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty())
    return res.json(result);
  
  if (!req.user) {
    console.log("no req.user here");
    return res.json({ errors: ["Must be logged in"] });
  }
  await createPost(
    req.user.userid,
    req.user.username,
    req.body.title,
    req.body.content
  );
  res.json({ errors: [] });
});

const postsGET = asyncHandler(async (req, res) => {
  const posts = await getPosts();
  console.log("posts sent");
  res.json(posts);
});

const postComments = asyncHandler(async (req, res) => {
  const comments = await getComments("posts", req.params.id);
  res.json(comments);
});
const postCommentsPost = asyncHandler(async (req, res) => {
  
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.json(result);
  
  console.log("comments created");
  if (!req.user) {
    console.log("no req.user here");
    return res.json({ errors: ["Must be logged in"] });
  }
  await createComment(
    req.user.userid,
    req.user.username,
    req.params.id,
    req.body.content
  );
  res.json({ errors: [] });
});

const postSingle = asyncHandler(async (req, res) => {
  res.json(await getPostSingle(req.params.id));
});
const postsPUT = asyncHandler(async (req, res) => {
  //do stuff
});
const postsDELETE = asyncHandler(async (req, res) => {
  //do stuff
});

module.exports = {
  postsPOST,
  postsGET,
  postsPUT,
  postsDELETE,
  postSingle,
  postComments,
  postCommentsPost,
  validateContent,
};
