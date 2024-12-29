const db = require("./pool.js");

const createUser = async (email, username, password) => {
  await db.query(
    "INSERT INTO users (email, username, password, date) VALUES ($1, $2, $3, $4)",
    [email, username, password, "today"]
  );
};
const createPost = async (authorid, title, content)=>  {
  await db.query(
    "INSERT INTO posts (authorid, title, content, published) VALUES ($1, $2, $3, $4)",
    [authorid, title, content, "today"]
  );
};

const createComment = async (authorid, postid, content) => {
  await db.query(
    "INSERT INTO comments (authorid, postid, content, published) VALUES ($1, $2, $3, $4)",
    [authorid, postid, content, "today"]
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

const getComments = async (id)=>  {
  
  const { rows } = await db.query(
    `SELECT comments.*, users.username AS authorusername 
    FROM comments 
    JOIN users 
    ON users.userid = comments.authorid 
    WHERE postid = $1 `,
    [id]
  );
  return rows;
};

const getPosts = async ()=>  {
  const { rows } = await db.query(`
    SELECT posts.*, users.username as authorusername 
    FROM posts
    JOIN users
    ON posts.authorid = users.userid`);
  return rows;
};
const getPostSingle = async (id) => {
  const { rows } = await db.query(`
    SELECT posts.*, users.username as authorusername 
    FROM posts
    JOIN users
    ON posts.authorid = users.userid
    WHERE posts.postid = $1`, [id]);
  return rows[0];
};
const getUserData = async (id) => {
  const { rows: posts } = await db.query(
    "SELECT postid, content, published, title FROM posts WHERE authorid = $1",
    [id]
  );
  const { rows: comments } = await db.query(
    "SELECT comments.authorid, commentid, comments.postid, comments.content, posts.title, comments.published FROM comments JOIN posts ON comments.postid = posts.postid WHERE comments.authorid = $1",
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
  const param = (table == "users") ? "userid" : (table =="posts") ? "postid" : "commentid";

  if (table != "users" && table != "posts" && table != "comments")
    return;
  
    await db.query(`DELETE FROM ${table} WHERE ${param} = $1`, [id]);
  if (table == "users") {
    await db.query("DELETE FROM posts WHERE authorid = $1", [id]);
    await db.query("DELETE FROM comments WHERE authorid = $1", [id]);
  } else if (table == "posts"){
    await db.query("DELETE FROM comments WHERE postid = $1", [id]);
  }
}

const verifyCreator = async (postid, userid, table) => {
  if (table != "comments" && table != "posts")
    return;
  
  const param = (table == "posts") ? "postid" : "commentid";
  
  const {rows} = await db.query(`SELECT authorid FROM ${table} WHERE ${param}=$1`,[postid]);
  if (rows[0].authorid == userid)
      return true;
  return false;
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
  deleteObject, 
  verifyCreator
};
