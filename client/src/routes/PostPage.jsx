import { useLocation, useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, getComments, createComment } from "../utils/api";
import { IoMdClose } from "react-icons/io";
import CommentContainer from "../components/CommentContainer";

const PostPage = () => {
  const { handleSelect, handleReveal, auth } = useOutletContext();
  const { pathname } = useLocation();
  const [post, setPost] = useState({
    title: "No title",
    content: "No content",
  });
  const [comments, setComments] = useState([]);
  const [creator, setCreator] = useState("");
  const [error, setError] = useState({});

  const handleCreate = async () => {
    
    if (auth.username) {
      const response = await createComment(creator, pathname);
      if (response.errors.length == 0){
        window.location.reload();
      } else {
        setError(response.errors[0]);
      }
    } else {
      handleReveal();
      console.log("must be logged in to create a comment");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const post = await getPost(pathname);
      setPost(post);
    };
    const fetchComments = async () => {
      const comments = await getComments(pathname);
      setComments(comments.reverse());
    };
    fetchPosts();
    fetchComments();
  }, [pathname]);

  return (
    <div className="bg-[#281E34] h-screen w-[80%] flex flex-col p-5">
      <Link
        className="hover:cursor-pointer hover:bg-red-900 duration-200 h-[5%] p-4 flex justify-center items-center border-b-2 border-t-2 border-[#453750]"
        onClick={() => {
          handleSelect(0);
        }}
        to="/"
      >
        <IoMdClose />
      </Link>
      <div className="bg-[#2E233C] h-[95%] p-3 rounded-b-lg">
        <div className="h-[75%]">
          <div className="h-[15%] font-bold text-3xl">
            {post.title}
            <div className="text-base font-normal text-gray-200">
              <Link
                to={`/users/${post.authorid}`}
                className="hover:text-gray-500 text-gray-300"
              >
                {post.authorusername}
              </Link>
            </div>
          </div>
          <div className="h-[75%] text-gray-300 p-5 text-base"> {post.content} </div>
        </div>

        <div className="h-[25%] flex justify-between gap-2">
          <textarea
            placeholder={`${ error.msg ? error.msg : "Leave a comment ..." }`}
            className={`w-[95%] bg-[#281E34] focus:outline-none p-2 h-full rounded-md ${error.msg ? "placeholder-red-500 border-2 border-red-500" : ""}`}
            onClick = {()=>{setError({})}}
            onChange={(e) => {
              setCreator(e.target.value);
            }}
          />
          <div
            className="w-[5%] h-full flex justify-center items-center duration-200 text-[#453750] text-2xl bg-transparent hover:bg-green-600 hover:cursor-pointer hover:text-gray-300 border-2 border-[#453750]"
            onClick={handleCreate}
          >
            {"►"}
          </div>
        </div>

        <div className="h-full p-3 mt-3 ">
          {comments.length != 0
            ? comments.map((comment) => {
                return (
                  <CommentContainer
                    key={comment.commentid}
                    comment={comment}
                    styles={"last:border-b-2"}
                  />
                );
              })
            : "Comment section is empty"}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
