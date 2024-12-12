import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PostContainer = ({ post }) => {
  console.log(post);

  return (
    <>
      <Link to="/" className="border-t-2 p-2 last:border-b-2 h-[30%] w-[100%] hover:bg-[#2E233C] border-[#342744] flex flex-col">
          <div className="h-[20%] p-1 text-2xl font-[550]">
            {" "}
            {post.title}{" "}
          </div>

          <div className="h-[65%] p-1 text-gray-300"> {post.content} </div>
          <div className="h-[15%] p-1 flex gap-2 items-center">
            <FaHeart/>
            {post.likes}
          </div>
      </Link>
    </>
  );
};

export default PostContainer;
