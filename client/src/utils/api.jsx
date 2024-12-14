const getPosts = async function () {
  try {
    const response = await fetch("http://localhost:3000/posts");
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
  // console.log (username);
  // console.log(password);
  // console.log(email);
  try {
    const result = await fetch("http://localhost:3000/users", {
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

export { getPosts, createUser };
