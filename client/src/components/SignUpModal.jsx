import { useState, useEffect } from "react";
import { createUser } from "../utils/api";
import { MdOutlineCancelPresentation } from "react-icons/md";

const SignUpModal = ({ reveal, handleReveal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) return;
    await createUser(username, email, password);
    handleReveal();
  };

  const textBoxStyle = "text-black rounded-lg h-[75%] p-2";
  if (reveal)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#342744] aspect-square h-[70%] p-4 flex flex-col items-center rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-[#453750] flex flex-col gap-3 h-[700%] w-[100%] p-3 items-center rounded-lg"
          >
            <div className="flex justify-between items-center w-[100%] font-semibold text-[#9882AC]">
              Sign-Up Form
              <MdOutlineCancelPresentation
                className="text-4xl transition-all hover:fill-red-500 duration-200 cursor-pointer"
                fill={"#9882AC"}
                onClick={handleReveal}
              />
            </div>
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-5 pt-9">
              <div>
                <div>Username</div>
                <input
                  type="text"
                  name="username"
                  placeholder="usernameAbc"
                  className={textBoxStyle}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div>
                <div>Email</div>
                <input
                  type="text"
                  name="Email"
                  placeholder="J@example.com"
                  className={textBoxStyle}
                  onChange={(e) => setEmail(e.target.value)}
                  ></input>
              </div>
              <div>
                <div>Password</div>
                <input
                  type="text"
                  name="Password"
                  placeholder="onetwothree"
                  className={textBoxStyle}
                  onChange={(e) => setPassword(e.target.value)}
                  ></input>
              </div>
              <button
                type="submit"
                className="w-[50%] h-[10%] bg-[#342744] flex justify-center items-center duration-200 text-gray-300 hover:bg-green-600 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};
export default SignUpModal;
