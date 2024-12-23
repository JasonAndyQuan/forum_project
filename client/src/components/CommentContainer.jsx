import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CommentContainer = ({ comment }) => {
  return (
    <>
      <div className="border-t-2 p-3 last:border-b-2 h-[30%] w-[100%] bg-[#281E34] border-[#342744] flex flex-col">
      <div className="w-full h-[20%] p-2 flex justify-between">
      {comment.authorusername}
      <div className="flex items-center gap-2">
        {comment.likes}
        <FaHeart />
      </div>

      </div>
      <div className="w-full h-[80%] p-2 text-gray-200">
      {comment.content}
      </div>
      </div>
    </>
  );
};

export default CommentContainer;
