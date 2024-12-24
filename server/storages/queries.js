const db = require("./pool.js");

/* 
 
 Creates: createUser, createPost, createComment  X
 Reads:
    getPosts      X
    filterPosts (given userid): show users post history X
    getUser  X
    checkUser x
    getComments (given either postid or userid): show comments under a post or a users comment history X

    
 updates: updateUser, updatePost, updateComment
 deletes: deleteUser, deletePost, deleteComment

*/
const createUser = async function (email, username, password) {
  await db.query(
    "INSERT into users (email, username, password, date) VALUES ($1, $2, $3, $4)",
    [email, username, password, "today"]
  );
};
const createPost = async function (authorid, authorusername, title, content) {
  await db.query(
    "INSERT into posts (authorid, title, content, published, authorusername) VALUES ($1, $2, $3, $4, $5)",
    [authorid, title, content, "today", authorusername]
  );
};

const createComment = async function (
  authorid,
  authorusername,
  postid,
  content
) {
  await db.query(
    "INSERT into comments (authorid, postid, content, published, authorusername) VALUES ($1, $2, $3, $4, $5)",
    [authorid, postid, content, "today", authorusername]
  );
};

const getUser = async function (id) {
  const { rows } = await db.query("SELECT * FROM users WHERE userid = $1", [
    id,
  ]);
  return rows[0]; //if user exists, return true
};

const getUser_username = async function (username) {
  const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0]; //if user exists, return true
};

const getComments = async function (table, id) {
  const param = table == "users" ? "authorid" : "postid";
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE ${param} = $1`,
    [id]
  );
  return rows;
};

const getPosts = async function () {
  const { rows } = await db.query("SELECT * FROM posts");
  return rows;
};
const getPostSingle = async function (id) {
  const { rows } = await db.query("SELECT * FROM posts WHERE postid=$1", [id]);
  return rows[0];
};
const getUserData = async function (id) {
  const { rows: posts } = await db.query(
    "SELECT postid, content, published, title FROM posts WHERE authorid = $1",
    [id]
  );
  // const { rows: comments } = await db.query(
  //   "SELECT commentid, content, published FROM comments WHERE authorid = $1",
  //   [id]
  // );
  const { rows: comments } = await db.query(
    "SELECT commentid, comments.postid, comments.content, posts.title, comments.published FROM comments JOIN posts ON comments.postid = posts.postid WHERE comments.authorid = $1",
    [id]
  );
  const { rows: users } = await db.query(
    "SELECT username, date FROM users WHERE userid = $1",
    [id]
  );

  const user = users[0];

  const result = { user, posts, comments };
  return result;
  //SELECT * FROM posts WHERE authorid = id;
  //SELECT * FROM comments WHERE authorid = id;
  //SELECT username, date FROM users WHERE userid = id;
};

const filterPosts = async function (id) {
  return await db.query("SELECT * FROM POSTS WHERE authorid = $1", [id]);
};

module.exports = {
  createUser,
  createPost,
  createComment,
  getUser,
  getUser_username,
  getComments,
  getPosts,
  getPostSingle,
  filterPosts,
  getUserData,
};
