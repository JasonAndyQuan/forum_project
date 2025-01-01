import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";

const CreatePostModal = ({
  handleSelect,
  actionName,
  selected,
  operation,
  ogPost,
}) => {
  const queryClient = useQueryClient();
  const [errs, setErrs] = useState({});
  const titleRef = useRef();
  const contentRef = useRef();

  const post = useMutation({
    mutationFn: operation,
    onSuccess: ({ errors }) => {
      console.log(errors);
      if (errors.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        handleSelect(0);
      } else {
        setErrs(
          errors.reduce((acc, item) => {
            acc[item.path] = item.msg;
            return acc;
          }, {})
        );
      }
    },
  });

  const handlePost = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    post.mutate({
      title: title,
      content: content,
      id: ogPost.postid,
    });
  };

  const errStyle = "placeholder-red-500 border-2 border-red-500";
  if (selected == 2)
    return (
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627] w-[30rem] min-w-[15rem] h-[70%] p-4 flex flex-col items-center rounded-lg">
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
                defaultValue={ogPost.title}
                name="title"
                type="text"
                placeholder={`${errs.title ? errs.title : "Title"}`}
                className={`w-full bg-transparent focus:outline-none p-2 border-b-[3px] border-[#342744] ${
                  errs.title ? errStyle : ""
                }`}
                ref={titleRef}
                onClick={() => {
                  setErrs({ ...errs, title: null });
                }}
              />
            </div>
            <div className="h-[90%] w-full">
              <textarea
                defaultValue={ogPost.content}
                name="content"
                type="text"
                placeholder={`${errs.content ? errs.content : "Content"}`}
                className={`w-full bg-transparent focus:outline-none p-2 h-full ${
                  errs.content ? errStyle : ""
                }`}
                ref={contentRef}
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
            {post.isPending ? (
              <CgSpinner className="animate-spin " />
            ) : actionName == "Create Post" ? (
              "Post"
            ) : (
              "Edit"
            )}
          </div>
        </div>
      </div>
    );
};
export default CreatePostModal;
