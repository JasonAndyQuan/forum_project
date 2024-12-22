import { useLocation, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, getComments } from "../utils/api";
import { IoMdClose } from "react-icons/io";
import CommentContainer from "../components/CommentContainer";



const PostPage = () => {
  const { handleSelect } = useOutletContext();
  const { pathname } = useLocation();
  const [post, setPost] = useState({
    title: "No title",
    content: "No content",
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const post = await getPost(pathname);
      console.log(post);
      setPost(post);
    };
    const fetchComments = async () => {
      const comments = await getComments(pathname);
      console.log(comments);
      setComments(comments);
    };
    fetchPosts();
    fetchComments();
  }, [pathname]);

  //   console.log(pathname);
  return (
    <div className="bg-[#281E34] h-screen w-[80%] flex flex-col p-5">
      <div
        className="hover:cursor-pointer hover:bg-red-900 duration-200 h-[5%] p-4 flex justify-center items-center border-b-2 border-t-2 border-[#453750]"
        onClick={() => {
          handleSelect(0);
        }}
      >
        <IoMdClose />
      </div>
      <div className="bg-[#2E233C] h-[95%] p-3">

        <div className="h-[65%]">
          <div className="h-[15%] font-bold text-2xl"> {post.title} 
            <div className="text-sm font-normal text-gray-200"> {post.authorusername} </div>
          </div>
          <div className="h-[75%] text-gray-300 p-5"> {post.content} </div>
        </div>

        <div className="h-[35%]">
            <div className="bg-slate-800 h-full"> wysiwyg section </div>
        </div>  

          <div className="h-full p-3 mt-3">
            {(comments)
              ? comments.map((comment) => {
                  return <CommentContainer key={comment.commentid} comment={comment} />;
                })
              : "Comments are Empty"}
          </div>


      </div>
    </div>
  );
};

export default PostPage;
