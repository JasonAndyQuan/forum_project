import db from "./pool.js";

/* 
 
 Creates: createUser, createPost, createComment
 Reads:
    getPosts
    filterPosts (given userid): show users post history
    getUser
    getComments (given either postid or userid): show comments under a post or a users comment history
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

export { createUser, createPost, createComment };
