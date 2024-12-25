import { Link } from "react-router-dom";
import timeAgo from "../utils/dates";

const CommentContainer = ({ comment, styles }) => {
  return (
    <>
      <div className={`border-t-2 p-3 ${styles} h-[30%] w-[100%] border-[#342744] flex flex-col`}>
        <div className="w-full h-[20%] p-2 flex justify-between  text-lg">
          {comment.authorusername ? (
            <Link
              to={`/users/${comment.authorid}`}
              className="hover:text-gray-500"
            >
              {comment.authorusername}
            </Link>
          ) : (
            <div className="flex gap-2">
              <h2 className="font-thin"> {`On: `} </h2>
              <Link to={`/posts/${comment.postid}`} className="font-[750] hover:text-gray-500">
                {`${comment.title}`}{" "}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            {timeAgo(comment.published)}
          </div>
        </div>
        <div className="w-full h-[80%] p-2 text-gray-300 text-md">
          {comment.content}
        </div>
      </div>
    </>
  );
};

export default CommentContainer;
