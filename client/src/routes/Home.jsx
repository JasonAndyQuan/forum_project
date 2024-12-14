import { getPosts } from "../utils/api";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ButtonsBox from "../components/ButtonsBox";
import PostContainer from "../components/PostContainer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {reveal} = useOutletContext();

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
      <div className="bg-[#281E34] w-[100%] h-screen flex p-5 gap-5 overflow-auto">
        <div className="w-[80%] flex flex-col p-3 ">
          {posts ? (
            posts.map((post) => {
              return <PostContainer post={post} key={post.postid} />;
            })
          ) : (
            <div className="bg-red-300"> no posts available </div>
          )}
        </div>
        {reveal ? <div> </div> : <ButtonsBox />}
      </div>
    </>
  );
};
export default Home;
