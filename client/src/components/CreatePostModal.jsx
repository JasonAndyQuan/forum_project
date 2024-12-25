import { createPost } from "../utils/api";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const CreatePostModal = ({ handleSelect }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const handlePost = async ( ) => {
        const errs = await createPost(title, content);
        console.log(errs);
        handleSelect(0);
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627] aspect-square w-[35%] h-auto p-4 flex flex-col items-center rounded-lg">
            <div className="h-[10%] w-full flex justify-between items-center font-bold text-xl text-gray-400  ">
            {"Create Post"}
            <MdOutlineCancelPresentation
                className="text-4xl transition-all hover:fill-red-500 duration-200 cursor-pointer"
                fill={"#9882AC"}
                onClick={() => {
                handleSelect(0);
                }}
            />
            </div>
            <div className="w-full h-[80%] p-1 bg-[#281E34] mb-2 max-w-full rounded-lg">
            <div className="h-[10%] w-full border-b-[3px] border-[#342744]">
                <input
                name="title"
                type="text"
                placeholder="Title"
                className="w-full bg-transparent focus:outline-none p-2"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />
            </div>
            <div className="h-[90%] w-full">
                <textarea
                name="content"
                type="text"
                placeholder="Content"
                className="w-full bg-transparent focus:outline-none p-2 h-full"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                />
            </div>
            </div>
            <div
            className=" w-[80%] h-[10%] flex justify-center items-center duration-200 text-gray-300 text-2xl bg-green-700 hover:bg-green-500 hover:cursor-pointer"
            onClick={handlePost}
            >
            {" "}
            Post{" "}
            </div>
        </div>
        </div>
    );
};
export default CreatePostModal;