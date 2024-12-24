import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserData } from "../utils/api";
import PostContainer from "../components/PostContainer";
import CommentContainer from "../components/CommentContainer";
import timeAgo from "../utils/dates";

const UserPage = () => {
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
  //selected: "bg-[#2E233C]"
  //not selected: "bg-[#281E34]"

  const bStyles =
    "hover:cursor-pointer hover:bg-[#342744] duration-200 p-2 text-center grow border-[#342744] ";
  const toggled = " bg-[#281E34] border-2 border-b-0";
  const untoggled = " bg-[#2E233C] border-b-2";

  console.log(pathname);
  return (
    <div className="flex items-center h-screen justify-center p-2 overflow-y-auto">
      <div className=" w-[50%] h-full flex flex-col">
        <div className="bg-[#2E233C] w-full h-[15%] p-2 flex border-2 border-[#342744] justify-between items-center mb-2">
          <h1 className="text-2xl"> {userData.user.username} </h1>
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
          <div className="bg-[] grow p-2 border-[#342744] border-2 border-t-0">
            {view
              ? userData.posts.map((post) => {
                  return (
                    <div className="max-h-[20%]">
                      <PostContainer post={post} />
                    </div>
                  );
                })
              : userData.comments.map((comment) => {
                  return (
                    <div className="max-h-[20%]">
                      <CommentContainer comment={comment}/>
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
