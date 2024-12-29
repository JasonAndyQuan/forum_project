const db = require("./pool.js");

const createUser = async (email, username, password) => {
  await db.query(
    "INSERT into users (email, username, password, date) VALUES ($1, $2, $3, $4)",
    [email, username, password, "today"]
  );
};
const createPost = async (authorid, authorusername, title, content)=>  {
  await db.query(
    "INSERT into posts (authorid, title, content, published, authorusername) VALUES ($1, $2, $3, $4, $5)",
    [authorid, title, content, "today", authorusername]
  );
};

const createComment = async (
  authorid,
  authorusername,
  postid,
  content
) => {
  await db.query(
    "INSERT into comments (authorid, postid, content, published, authorusername) VALUES ($1, $2, $3, $4, $5)",
    [authorid, postid, content, "today", authorusername]
  );
};

const getUser = async (id)=>  {
  const { rows } = await db.query("SELECT * FROM users WHERE userid = $1", [
    id,
  ]);
  return rows[0];
};

const getUser_username = async (username)=>  {
  const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};

const getComments = async (table, id)=>  {
  
  if (table != "users" && table != "posts")
    return;

  const param = table == "users" ? "authorid" : "postid";
  const { rows } = await db.query(
    `SELECT * FROM comments WHERE ${param} = $1`,
    [id]
  );
  return rows;
};

const getPosts = async ()=>  {
  const { rows } = await db.query("SELECT * FROM posts");
  return rows;
};
const getPostSingle = async (id) => {
  const { rows } = await db.query("SELECT * FROM posts WHERE postid=$1", [id]);
  return rows[0];
};
const getUserData = async (id) => {
  const { rows: posts } = await db.query(
    "SELECT postid, content, published, title FROM posts WHERE authorid = $1",
    [id]
  );
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
};

const deleteObject = async (table, id) =>{
  const param = (table == "users") ? "userid" : "postid";

  if (table != "users" && table != "posts")
    return;
    await db.query(`DELETE FROM ${table} WHERE ${param} = $1`, [id]);
  if (table == "users") {
    await db.query("DELETE FROM posts WHERE authorid = $1", [id]);
    await db.query("DELETE FROM comments WHERE authorid = $1", [id]);
  }
}

const updateObject = async (table, id) => {
  if (table != "users" && table != "posts")
    return;
  const param = (table == "users") ? "userid" : "postid";

}


module.exports = {
  createUser,
  createPost,
  createComment,
  getUser,
  getUser_username,
  getComments,
  getPosts,
  getPostSingle,
  getUserData,
  deleteObject
};
