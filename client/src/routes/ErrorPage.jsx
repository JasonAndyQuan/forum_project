import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <>
      <div className="h-screen flex bg-[#281E34] items-center justify-center flex-col">

      <h1 className=" text-center h-[20%] text-4xl"> {"An error has occurred"}</h1>
      <Link to="/" className="animate-bounce bg-green-900 h-[15%] aspect-square text-center"> {"(Click to go back)"}</Link>
      </div>
    </>
  );
};

export default ErrorPage;
