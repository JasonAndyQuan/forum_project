import { Link } from "react-router-dom";
const ButtonsBox = () =>{
    const buttonStyle = "border-[#342744] border-2 w-[80%] h-[10%] flex justify-center items-center duration-200 text-gray-300";
    return (<>
    <div className="border-l-2 w-[20%] border-[#342744] p-2 flex flex-col items-center gap-3 fixed right-1 h-screen">
        <div className={`${buttonStyle} text-5xl hover:bg-[#043D2A]`}>  + </div>
        <Link className={`${buttonStyle} hover:bg-[#2D5D76]`} to="\"> About </Link>
    </div>
    </>)
}


export default ButtonsBox;