import db from "./pool.js";

/* 
 
 Creates: createUser, createPost, createComment  X
 Reads:
    getPosts      X
    filterPosts (given userid): show users post history X
    getUser  X
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
const createPost = async function (authorid, title, content) {
  await db.query(
    "INSERT into posts (authorid, title, content, likes, published) VALUES ($1, $2, $3, $4, $5)",
    [authorid, title, content, 0, "today"]
  );
};

const createComment = async function (authorid, postid, content) {
  await db.query(
    "INSERT into comments (authorid, postid, content, likes, published) VALUES ($1, $2, $3, $4, $5)",
    [authorid, postid, content, 0, "today"]
  );
};

const getUser = async function (id) {
  return db.query("SELECT * FROM users WHERE id = $1", [id]);
};

const getComments = async function (table, id) {
  const param = (table == "users") ? "authorid" : "postid";
  return db.query(`SELECT * FROM ${table} WHERE ${param} = $1`, [id]);
};

const getPosts = async function () {
  return db.query("SELECT * FROM posts");
};

const filterPosts = async function (id) {
  return db.query("SELECT * FROM POSTS WHERE authorid = $1", [id]);
};

export { createUser, createPost, createComment, getUser, getComments, getPosts, filterPosts };
