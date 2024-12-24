import { Link } from "react-router-dom";

const PostContainer = ({ post, handleSelect }) => {
  return (
    <>
      <Link
        to={`/posts/${post.postid}`}
        onClick={() => {handleSelect(true)}}
        className="border-t-2 p-3 last:border-b-2 h-[30%] w-[100%] hover:bg-[#2E233C] border-[#342744] flex flex-col"
      >
        <div className="h-[20%] p-1 text-2xl font-[550] mb-4"> {post.title} </div>
        <div className="h-[65%] p-1 text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap"> {post.content} </div>
        <div className="h-[15%] p-1 flex gap-2 items-center">
          {"by: "}
          {post.authorusername}
        </div>
      </Link>
    </>
  );
};

export default PostContainer;
