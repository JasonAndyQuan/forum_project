import { Link, useNavigate } from "react-router-dom";
import timeAgo from "../utils/dates";

const PostContainer = ({ post, styles }) => {
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/posts/${post.postid}`);
  };
  return (
    <>
      <div
        onClick={handlePostClick}
        className={`border-t-2 p-3 ${styles} h-[30%] w-[100%] hover:bg-[#2E233C] hover:cursor-pointer border-[#342744] flex flex-col`}
      >
        <div className="h-[20%] p-1 text-2xl font-[550] flex justify-between items-center">
          {" "}
          {post.title}
          <p className="text-sm font-normal">  {timeAgo(post.published)}</p>
        </div>
        <Link
          to={`/users/${post.authorid}`}
          onClick={(e) => e.stopPropagation()}
          className="hover:text-gray-500 p-1 mb-2 text-gray-300 w-fit"
        >
          {post.authorusername ? post.authorusername : ""}
        </Link>

        <div className="h-[65%] p-1 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {" "}
          {post.content}{" "}
        </div>
      </div>
    </>
  );
};

export default PostContainer;
