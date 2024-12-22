import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CommentContainer = ({comment}) => {
  return (
    <>
      <div
        className="border-t-2 p-3 last:border-b-2 h-[30%] w-[100%] bg-[#281E34] border-[#342744] flex justify-between"
      >
        <div className="h-[65%] p-1 text-gray-300  text-wrap"> {comment.content} </div>
        <div className="h-[15%] p-1 flex gap-2 items-center">
          {comment.likes}
          <FaHeart />
        </div>
      </div>
    </>
  );
};

export default CommentContainer;
