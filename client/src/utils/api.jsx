//re do all this later 

const link = "http://localhost:3000";

const getPosts = async function () {
  try {
    const response = await fetch(`${link}/posts`);
    if (!response.ok) {
      throw new Error("Network response no work");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
const createUser = async function (username, email, password) {
  try {
    const result = await fetch(`${link}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    return await result.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const loginUser = async function (username, password) {
  try {
    const result = await fetch(`${link}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!result.ok) {
      throw new Error(`Login failed: ${result.status} ${result.statusText}`);
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};
const getSession = async function () {
  try {
    const result = await fetch(`${link}/sesh`, {
      credentials: "include",
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
const logOut = async function () {
  try {
    const result = await fetch(`${link}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await result;
  } catch (err) {
    console.log(err);
  }
};

const getPost = async function (id) {
  try {
    const result = await fetch(`${link}${id}`);
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};

const getComments = async function (id) {
  try {
    const result = await fetch(`${link}${id}/comments`);
    if (result.ok) return await result.json();
  } catch (err) {
    console.log(err);
  }
};

const createPost = async function (title, content) {
  try {
    const result = await fetch(`${link}/posts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    if (!result.ok) {
      console.log("response createpost not ok");
    } else {
      return await result.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const createComment = async function (content, postPath) {
  try {
    const result = await fetch(`${link}${postPath}/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });
    if (!result.ok) {
      console.log("response createComment not ok");
    } else {
      return await result.json();
    }
  } catch (err) {
    console.log(err);
  }
};
const getUserData = async function (path) {
  try {
    const response = await fetch(`${link}${path}`, {
      credentials: "include",
    });
    if (response.ok) return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${link}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
};
const deletePost = async (path) => {
  try {
    const response = await fetch(`${link}${path}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteComment = async (id) => {
  try {
    const response = await fetch(`${link}/posts/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (id, title, content) => {
  try {
    const response = await fetch(`${link}/posts/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log(err);
  }
};
export {
  getPosts,
  getPost,
  createUser,
  loginUser,
  getSession,
  getComments,
  logOut,
  createPost,
  createComment,
  getUserData,
  deleteUser,
  deletePost,
  deleteComment,
  updatePost,
};
