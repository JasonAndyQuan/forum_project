import { Link, useOutletContext } from "react-router-dom";
const ButtonsBox = ({ handleSelect }) => {
  const { auth, handleReveal } = useOutletContext();
  const isLoggedin = auth.username ? true : false;
  const welcome = isLoggedin
    ? `Welcome, ${auth.username} !`
    : "Not logged in ...";
  const buttonStyle =
    "border-[#342744] border-2 w-[80%] h-[10%] flex justify-center items-center duration-200 text-gray-300";
  const handleCreateClick = () => {
    if (isLoggedin) {
      handleSelect(2);
    } else {
      handleReveal();
    }
  };
  return (
    <>
      <div className="border-l-2 w-[20%] border-[#342744] p-2 flex flex-col items-center gap-3 fixed right-1 h-[87%]">
        <div
          className={`${buttonStyle} h-[5%] duration-1000 ${
            isLoggedin ? "bg-green-900" : "bg-red-950"
          }`}
        >
          {welcome}
        </div>
        <div
          className={`${buttonStyle} text-5xl hover:bg-green-600 hover:cursor-pointer `}
          onClick={handleCreateClick}
        >
          {"+"}
        </div>
        <Link className={`${buttonStyle} hover:bg-blue-600`} to="/about">
          {"About"}
        </Link>
      </div>
    </>
  );
};

export default ButtonsBox;
