import { Link } from "react-router-dom";
import timeAgo from "../utils/dates";

const PostContainer = ({ post, handleSelect, styles }) => {
  return (
    <>
      <Link
        to={`/posts/${post.postid}`}
        onClick={() => {
          handleSelect(true);
        }}
        className={`border-t-2 p-3 ${styles} h-[30%] w-[100%] hover:bg-[#2E233C] border-[#342744] flex flex-col`}
      >
        <div className="h-[20%] p-1 text-2xl font-[550] flex justify-between items-center">
          {" "}
          {post.title}
          <p className="text-sm font-normal">  {timeAgo(post.published)}</p>
        </div>
          <Link to={`/users/${post.authorid}`} className="hover:text-gray-500 p-1 mb-2 text-gray-300 w-fit">
            {(post.authorusername) ? post.authorusername : ""}
          </Link>

        <div className="h-[65%] p-1 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {" "}
          {post.content}{" "}
        </div>
      </Link>
    </>
  );
};

export default PostContainer;
