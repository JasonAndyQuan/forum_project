import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState } from "react";

const CreatePostModal = ({ handleSelect, actionName, selected, operation, postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errs, setErrs] = useState({});

  const handlePost = async () => {
    const { errors } = postId
      ? await operation(postId, title, content)
      : await operation(title, content);
    if (errors.length != 0) {
      const errorObj = errors.reduce((acc, item) => {
        acc[item.path] = item.msg;
        return acc;
      }, {});
      console.log(errorObj);
      setErrs(errorObj);
    } else {
      handleSelect(0);
      window.location.reload();
    }
  };
  
  const errStyle = "placeholder-red-500 border-2 border-red-500";
  if (selected == 2)
    return (
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627] w-[30%] min-w-[15rem] h-[70%] p-4 flex flex-col items-center rounded-lg">
          <div className="h-[10%] w-full flex justify-between items-center font-bold text-lg text-gray-400">
            {actionName}
            <MdOutlineCancelPresentation
              className="text-4xl transition-all hover:fill-red-500 duration-200 cursor-pointer "
              fill={"#9882AC"}
              onClick={() => {
                handleSelect(0);
              }}
            />
          </div>
          <div className="w-full h-[80%] p-1 bg-[#281E34] mb-2 max-w-full rounded-lg">
            <div className="h-[10%] w-full ">
              <input
                name="title"
                type="text"
                placeholder={`${errs.title ? errs.title : "Title"}`}
                className={`w-full bg-transparent focus:outline-none p-2 border-b-[3px] border-[#342744] ${
                  errs.title ? errStyle : ""
                }`}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                onClick={() => {
                  setErrs({ ...errs, title: null });
                }}
              />
            </div>
            <div className="h-[90%] w-full">
              <textarea
                name="content"
                type="text"
                placeholder={`${errs.content ? errs.content : "Content"}`}
                className={`w-full bg-transparent focus:outline-none p-2 h-full ${
                  errs.content ? errStyle : ""
                }`}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                onClick={() => {
                  setErrs({ ...errs, content: null });
                }}
              />
            </div>
          </div>
          <div
            className=" w-[50%] h-[10%] flex justify-center items-center duration-200 text-gray-300 text-xl bg-green-700 hover:bg-green-500 hover:cursor-pointer"
            onClick={handlePost}
          >
            {actionName == "Create Post" ? "Post" : "Edit"}
          </div>
        </div>
      </div>
    );
};
export default CreatePostModal;
