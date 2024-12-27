import { getPosts } from "../utils/api";
import { useState, useEffect } from "react";
import { useOutletContext, Outlet, useLocation } from "react-router-dom";
import ButtonsBox from "../components/ButtonsBox";
import PostContainer from "../components/PostContainer";
import CreatePostModal from "../components/CreatePostModal";
import PostPage from "./PostPage";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(0);                      //0 for default,
  const { reveal, handleReveal, auth } = useOutletContext();       //1 for a selected post
                                                                    // 2 for create post modal

  const { pathname } = useLocation();

  window.addEventListener("popstate", () => {
    handleSelect(0);
  });

  const handlePosts = (postList) => {
    setPosts(postList);
  };

  const handleSelect = (num) => {
    setSelected(num);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsList = await getPosts();
      handlePosts(postsList.reverse());
    };
    if (pathname == "/") {
      fetchPosts();
    } else {
      handleSelect(1);
    }
  }, [pathname]);

  return (
    <>
      <div className="bg-[#281E34] w-[100%] h-screen flex p-5 gap-5 overflow-auto">
        {selected == 1 ? (
          <Outlet context={{ handleSelect, handleReveal, auth} /* prop drilling moment */} />
        ) : selected == 0 ? (
          <>
            <div className="w-[80%] flex flex-col p-3 ">
              {posts.length != 0 ? (
                posts.map((post) => {
                  return (
                    <PostContainer
                      post={post}
                      key={post.postid}
                      styles={"last:border-b-2"}
                      handleSelect={handleSelect}
                    />
                  );
                })
              ) : (
                <div className="bg-red-800 p-2"> no posts available </div>
              )}
            </div>
          </>
        ) : (
          <CreatePostModal handleSelect={handleSelect} />
        )}
        {reveal || selected == 2 ? (
          <div> </div>
        ) : (
          <ButtonsBox handleSelect={handleSelect} />
        )}
      </div>
    </>
  );
};
export default Home;
