const asyncHandler = require("express-async-handler");
const db = require("../storages/queries.js");
const { body, validationResult } = require("express-validator");

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

const createPost = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.json(result);
  
  if (!req.user) {
    console.log("no req.user here");
    return res.json({ errors: ["Must be logged in"] });
  }
  await db.createPost(
    req.user.userid,
    req.user.username,
    req.body.title,
    req.body.content
  );
  res.json({ errors: [] });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await db.getPosts();
  res.json(posts);
});

const getComments = asyncHandler(async (req, res) => {
  const comments = await db.getComments("posts", req.params.id);
  res.json(comments);
});
const createComment = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.json(result);
  
  console.log("comments created");
  if (!req.user) {
    console.log("no req.user here");
    return res.json({ errors: ["Must be logged in"] });
  }
  await db.createComment(
    req.user.userid,
    req.user.username,
    req.params.id,
    req.body.content
  );
  res.json({ errors: [] });
});

const getPost = asyncHandler(async (req, res) => {
  res.json(await db.getPostSingle(req.params.id));
});
const updatePost = asyncHandler(async (req, res) => {
  //do stuff
});
const deletePost = asyncHandler(async (req, res) => {
  //do stuff
});

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  getComments,
  createComment,
  validateContent,
};
