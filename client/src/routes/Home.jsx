import { getPosts, createPost } from "../utils/api";
import { useState, useEffect } from "react";
import { useOutletContext, Outlet, useLocation } from "react-router-dom";
import ButtonsBox from "../components/ButtonsBox";
import PostContainer from "../components/PostContainer";
import CreatePostModal from "../components/CreatePostModal";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const Home = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await getPosts();
    },
  });

  const [boxBlur, setBoxBlur] = useState(false);
  const [selected, setSelected] = useState(0); //0 main, 1 post, 2 modal.
  const { reveal, handleReveal, auth } = useOutletContext();
  const { pathname } = useLocation();

  const handleSelect = (num) => {
    setSelected(num);
  };

  useEffect(() => {
    if (pathname == "/") {
      handleSelect(0);
      setBoxBlur(false);
    } else {
      handleSelect(1);
    }
  }, [pathname]);

  return (
    <>
      <div className="bg-[#281E34] w-[100%] h-screen flex p-5 gap-5 overflow-auto ">
        <CreatePostModal
          selected={selected}
          handleSelect={handleSelect}
          operation={createPost}
          actionName={"Create Post"}
          ogPost={{}}
        />
        {posts.isError ? (
          <>
            <div className="p-1 flex w-[80%] items-start h-screen justify-center animate-pulse">
              <div className="text-center bg-red-800 p-3 rounded-md">
                {" Unable to fetch posts "}
              </div>
            </div>
          </>
        ) : selected == 1 ? (
          <Outlet
            context={
              {
                handleSelect,
                handleReveal,
                auth,
                setBoxBlur,
              } /* prop drilling moment */
            }
          />
        ) : (
          <div className="w-[80%] flex flex-col p-3">
            {posts.isLoading ? (
              <Spinner msg={"Fetching posts"} />
            ) : posts.data?.length === 0 ? (
              <div className="w-full bg-red-900 p-3  rounded-md ">
                {"No available posts"}
              </div>
            ) : (
              posts.data?.map((post) => {
                return (
                  <PostContainer
                    post={post}
                    key={post.postid}
                    styles={"last:border-b-2"}
                  />
                );
              })
            )}
          </div>
        )}
        {reveal || selected == 2 || boxBlur ? (
          <div> </div>
        ) : (
          <ButtonsBox handleSelect={handleSelect} />
        )}
      </div>
    </>
  );
};
export default Home;
