import { Link } from "react-router-dom";
import timeAgo from "../utils/dates";
import { useOutletContext } from "react-router-dom";
import { deleteComment } from "../utils/api";
import { FaTrashAlt } from "react-icons/fa";


const CommentContainer = ({ comment, styles }) => {

  const {auth} = useOutletContext();
  const handleDelete = async() =>{
    const response = await deleteComment(comment.commentid);
    window.location.reload();
    console.log(response);
  } 

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
          <div className="flex gap-2 text-sm h-full grow items-center justify-end">
            {auth.userid == comment.authorid ? <FaTrashAlt 
                    className="hover:cursor-pointer hover:fill-red-300 fill-red-600" 
                    onClick={handleDelete}  
                    name="Delete Comment"
            /> : <></>}
                        {timeAgo(comment.published)}

          </div>
        </div>
        <div className="w-full h-[80%] p-2 text-gray-300 text-md whitespace-normal break-words">
          {comment.content}
        </div>
      </div>
    </>
  );
};

export default CommentContainer;
