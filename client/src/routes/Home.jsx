import { getPosts } from "../utils/api";
import { useState, useEffect } from "react";
import ButtonsBox from "../components/ButtonsBox";
import PostContainer from "../components/PostContainer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const handlePosts = (postList) => {
    setPosts(postList);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const postsList = await getPosts();
      handlePosts(postsList);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="bg-[#281E34] w-[100%] h-screen text-green-900 flex p-5 gap-5">
        <div className="w-[80%] flex flex-col p-3 overflow-y-auto">
          {posts ? (
            posts.map((post) => {
              return <PostContainer post={post} />;
            })
          ) : (
            <div className="bg-red-300"> no posts available </div>
          )}
        </div>
        <ButtonsBox />
      </div>
    </>
  );
};
export default Home;
