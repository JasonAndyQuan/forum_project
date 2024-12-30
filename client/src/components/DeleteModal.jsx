import { MdOutlineCancelPresentation } from "react-icons/md";
const DeleteModal = ({ reveal, handleReveal, handleDelete, object }) => {
  //user or post
  const isUser = object.username ? true : false;
  const areYouSure = 
    <>
      {"Are you sure you want to delete this "} {isUser ? "user" : "post"}:
      <br />
      <br />
      <div className="text-red-600 overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
        {isUser ? object.username : object.title}
      </div>
      <br />
      {"Doing so will also delete any associated comments"}
      {isUser ? " and posts" : ""}.
    </>

  if (reveal == 1)
    return (
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627] aspect-square w-[25%] h-auto p-4 flex flex-col items-center rounded-lg">
          <div className="flex flex-col grow rounded-lg bg-[#342744] p-1">
            <div className="grow w-full p-3 font-bold ">
              <MdOutlineCancelPresentation
                className="text-3xl transition-all hover:fill-red-500 duration-200 cursor-pointer justify-self-end mb-4"
                fill={"#9882AC"}
                onClick={() => {handleReveal(0)}}
              />
              <h3 className="bg-[#1E1627] p-2 rounded-md"> {areYouSure} </h3>
            </div>
            <div
              className="bg-red-800 hover:bg-red-500 h-[15%] w-full flex justify-center items-center duration-200 text-gray-300 rounded-md hover:cursor-pointer"
              onClick={handleDelete}
            >
              {"DELETE"}
            </div>
          </div>
        </div>
      </div>
    );
};
export default DeleteModal;
