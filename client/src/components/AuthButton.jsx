const AuthButton = ({ auth, handleReveal, handleLogOut }) => {
  const isUserAuthed = (auth.username == "") ? "Sign up / Sign In" : "Log out";
  return (
    <div className="rounded-md w-[80%] bg-gradient-to-r from-purple-700 via-red-800  to-purple-800 p-[0.05rem]">
      <div
        onClick={(auth.username == "") ? handleReveal : handleLogOut}
        className="w-[100%] rounded-md flex justify-center items-center duration-200 text-gray-300 hover:cursor-pointer hover:bg-transparent bg-[#281E34]"
      >
        {isUserAuthed}
      </div>
    </div>
  );
};
export default AuthButton;
