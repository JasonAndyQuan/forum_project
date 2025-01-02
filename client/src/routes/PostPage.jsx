import {
  useLocation,
  useOutletContext,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getPost,
  getComments,
  createComment,
  deletePost,
  updatePost,
} from "../utils/api";
import timeAgo from "../utils/dates";
import { IoMdClose } from "react-icons/io";
import CommentContainer from "../components/CommentContainer";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";
import CreatePostModal from "../components/CreatePostModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { CgSpinner } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";


const PostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSelect, handleReveal, auth, setBoxBlur } = useOutletContext();
  const { pathname } = useLocation();
  const { id } = useParams();

  const [error, setError] = useState({});
  const [modalReveal, setModalReveal] = useState(0);
  const commentRef = useRef();
  //0 -> hide
  //1 -> deletePost
  //2 -> editPost

  const post = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      return await getPost(pathname);
    },
  });
  const comments = useQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: async () => {
      return await getComments(pathname);
    },
  });
  const mutateComment = useMutation({
    mutationFn: createComment,
    onSuccess: ({errors}) => {
      if (errors.length === 0){
        queryClient.invalidateQueries({queryKey: ["posts",id,"comments"], exact: true})
      } else {
        setError(errors[0]);
        throw new Error();
      }
    },
    onError: () => {
      console.log("err here");
    }
  })

  const handleModalReveal = (num) => {
    setBoxBlur(num);
    setModalReveal(num);
  };


  const handleCreate = async () => {
    if (auth.username) {
      mutateComment.mutate({
        postPath: pathname,
        content: commentRef.current.value,
      })
    } else {
      handleReveal();
      console.log("must be logged in to create a comment");
    }
    commentRef.current.value = "";
  };

  const handlePostDelete = async () => {
    await deletePost(pathname);
    queryClient.invalidateQueries({queryKey: ["posts"]})
    navigate("/");
  };

  if (post.isErr) {
    return (
      <div className="p-1 flex items-start h-screen justify-center animate-pulse">
        <div className="text-center bg-red-800 p-3 rounded-md">
          {" Post not found "}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#281E34] h-screen w-[80%] flex flex-col p-5">
      {!post.isLoading && (
        <>
          <DeleteModal
            reveal={modalReveal}
            handleReveal={handleModalReveal}
            handleDelete={handlePostDelete}
            object={post?.data}
          />
          <CreatePostModal
            selected={modalReveal}
            handleSelect={handleModalReveal}
            actionName={"Edit post"}
            operation={updatePost}
            ogPost={post?.data}
          />
        </>
      )}
      <Link
        className="hover:cursor-pointer hover:bg-red-900 duration-200 h-[5%] p-4 flex justify-center items-center border-b-2 border-t-2 border-[#453750]"
        onClick={() => {
          handleSelect(0);
        }}
        to="/"
      >
        <IoMdClose />
      </Link>
      <div className="bg-[#2E233C] h-[95%] w-full p-3 rounded-b-lg">
        <div className="h-[75%] w-full">
          {post.isLoading ? (
            <Spinner msg={"Fetching Post"} />
          ) : (
            <>
              <div className="h-[15%] flex w-full justify-between ">
                <div className="w-fit">
                  <div className="flex gap-2 items-center w-full">
                    <div className="font-bold text-2xl w-full min-w-[10rem] overflow-auto max-h-[5rem]">
                      {post.data?.title}
                    </div>
                    {auth.userid == post.data?.authorid ? (
                      <>
                        <FaTrashAlt
                          className="hover:cursor-pointer hover:fill-red-300 fill-red-600"
                          onClick={() => {
                            handleModalReveal(1);
                          }}
                          name="Delete Post"
                        />
                        <FaRegEdit
                          className="hover:cursor-pointer hover:fill-blue-400 fill-blue-700"
                          onClick={() => {
                            handleModalReveal(2);
                          }}
                          name="Edit Post"
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-base font-normal text-gray-200">
                    <Link
                      to={`/users/${post.data.authorid}`}
                      className="hover:text-gray-500 text-gray-300"
                    >
                      {post.data?.authorusername}
                    </Link>
                  </div>
                </div>
                <h2> {timeAgo(post.data?.published)}</h2>
              </div>
              <div className="h-[75%] text-gray-300 p-5 text-base whitespace-normal break-words overflow-auto">
                {" "}
                {post.data?.content}{" "}
              </div>
            </>
          )}
        </div>
        <div className="h-[25%] flex justify-between gap-2">
          <textarea
            placeholder={`${error.msg ? error.msg : "Leave a comment ..."}`}
            className={`grow bg-[#281E34] focus:outline-none p-2 h-full rounded-md ${
              error.msg ? "placeholder-red-500 border-2 border-red-500" : ""
            }`}
            onClick={() => {
              setError({});
            }}
            ref={commentRef}
          />

          <div
            className={`w-16 h-full flex justify-center items-center duration-200 text-[#453750] text-2xl bg-transparent
             hover:bg-green-600 hover:cursor-pointer hover:text-gray-300 border-2 border-[#453750]
              ${error.msg && "bg-red-500 text-white"}
              `}
            onClick={handleCreate}
          >
            {mutateComment.isPending ? <CgSpinner /> 
            : mutateComment.isSuccess ? <FaRegCheckCircle className="fill-green-500"/> 
            : "►"}
          </div>
        </div>

        <div className="h-full p-3 mt-3 ">
          {comments.isLoading ? (
            <Spinner msg={"Fetching Comments"} />
          ) : comments.data?.length != 0 ? (
            comments.data?.map((comment) => {
              return (
                <CommentContainer
                  key={comment.commentid}
                  comment={comment}
                  styles={"last:border-b-2"}
                />
              );
            })
          ) : (
            "Comment section is empty"
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
