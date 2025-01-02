import {
  useLocation,
  useOutletContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserData, deleteUser } from "../utils/api";
import PostContainer from "../components/PostContainer";
import CommentContainer from "../components/CommentContainer";
import timeAgo from "../utils/dates";
import DeleteModal from "../components/DeleteModal";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const UserPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { auth } = useOutletContext();
  const [view, setView] = useState(true);
  const [reveal, setReveal] = useState(0);

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      return await getUserData(pathname);
    },
    select: (data) => {
      if (!data.user) {
        throw new Error();
      }
      return data;
    },
  });

  const handleReveal = (num) => {
    setReveal(num);
  };
  const handleView = (bool) => {
    setView(bool);
  };

  const handleDelete = async () => {
    await deleteUser(auth.userid);
    navigate("/");
    window.location.reload();
  };

  const bStyles = "duration-200 p-2 text-center grow border-[#342744] ";
  const toggled = " bg-[#281E34] border-2 border-b-0";
  const untoggled =
    " bg-[#2E233C] border-b-2 hover:cursor-pointer hover:bg-[#342744] ";

  if (isLoading) {
    return <Spinner msg={`Loading User ${id} `} />;
  }
  if (isError) {
    return (
      <div className="p-1 flex items-start h-screen justify-center animate-pulse">
        <div className="text-center bg-red-800 p-3 rounded-md">
          {" User not found "}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen justify-center p-2 overflow-y-auto">
      <DeleteModal
        reveal={reveal}
        handleReveal={handleReveal}
        handleDelete={handleDelete}
        object={auth}
      />
      <div className=" w-[45rem] min-w-[15rem] h-full flex flex-col">
        <div className="bg-[#2E233C] w-full min-h-[15%] max-h-[15%] p-4 flex border-2 border-[#342744] justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl"> {userData.user.username} </h1>
            {auth.username == userData.user.username ? (
              <FaTrashAlt
                name="deleteUser"
                onClick={() => {
                  handleReveal(1);
                }}
                className="hover:cursor-pointer hover:fill-red-300 fill-red-600"
              />
            ) : (
              <div></div>
            )}
          </div>
          <h3> {` Joined: ${timeAgo(userData.user.date)}`} </h3>
        </div>
        <div className="w-full grow flex flex-col">
          <div className="h-[10%] flex">
            <div
              className={`${view ? toggled : untoggled} ${bStyles} `}
              onClick={() => {
                handleView(true);
              }}
            >
              {" "}
              {`Posts (${userData.posts.length})`}{" "}
            </div>
            <div
              className={`${view ? untoggled : toggled} ${bStyles}`}
              onClick={() => {
                handleView(false);
              }}
            >{`Comments (${userData.comments.length})`}</div>
          </div>
          <div className="bg-transparent grow p-3 border-[#342744] border-2 border-t-0">
            {view
              ? userData.posts.map((post) => {
                  return (
                    <div
                      className="last:border-b-2 border-[#342744]"
                      key={post.postid}
                    >
                      <PostContainer post={post} styles={""} />
                    </div>
                  );
                })
              : userData.comments.map((comment) => {
                  return (
                    <div
                      className="last:border-b-2 border-[#342744]"
                      key={comment.commentid}
                    >
                      <CommentContainer comment={comment} styles={""} />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
