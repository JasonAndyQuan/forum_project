import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserData, deleteUser } from "../utils/api";
import PostContainer from "../components/PostContainer";
import CommentContainer from "../components/CommentContainer";
import timeAgo from "../utils/dates";
import DeleteModal from "../components/DeleteModal";
import { FaTrashAlt } from "react-icons/fa";

const UserPage = () => {
  const navigate = useNavigate();
  const { auth } = useOutletContext();
  const [userData, setUserData] = useState({
    user: {
      username: "Not found",
      date: "none",
    },
    posts: [],
    comments: [],
  });

  const [view, setView] = useState(true);
  const { pathname } = useLocation();
  const [reveal, setReveal] = useState(0);
  const handleReveal = (num) => {
    setReveal(num);
  };
  const handleView = (bool) => {
    setView(bool);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData(pathname);
      console.log(result);
      setUserData(result);
    };
    fetchUserData();
  }, [pathname]);

  const handleDelete = async () => {
    const response = await deleteUser(auth.userid);
    navigate("/");
    window.location.reload();
  };

  const bStyles = "duration-200 p-2 text-center grow border-[#342744] ";
  const toggled = " bg-[#281E34] border-2 border-b-0";
  const untoggled =
    " bg-[#2E233C] border-b-2 hover:cursor-pointer hover:bg-[#342744] ";
  console.log(pathname);
  return (
    <div className="flex items-center h-screen justify-center p-2 overflow-y-auto">
      <DeleteModal
        reveal={reveal}
        handleReveal={handleReveal}
        handleDelete={handleDelete}
        object={auth}
      />
      <div className=" w-[50%] h-full flex flex-col">
        <div className="bg-[#2E233C] w-full  min-h-[15%] max-h-[15%] p-4 flex border-2 border-[#342744] justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl"> {userData.user.username} </h1>
            {auth.username == userData.user.username ? (
              <FaTrashAlt
                name="deleteUser"
                onClick={() => {handleReveal(1)}}
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
