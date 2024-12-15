import { useState, useEffect } from "react";
import { createUser, loginUser } from "../utils/api";
import { MdOutlineCancelPresentation } from "react-icons/md";

const SignUpModal = ({ reveal, handleReveal }) => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [signUp, setSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStyle = (bool) => {
    setErrors({ username: "", password: "", email: "" });
    setSignUp(bool);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signUp) {
      console.log("sign up here");
      const { errors } = await createUser(username, email, password);
      console.log(errors);
      if (errors.length !== 0) {
        const errs = errors.reduce(
          (acc, err) => {
            if (["username", "password", "email"].includes(err.path)) {
              acc[err.path] = err.msg;
            }
            return acc;
          },
          {username: "", password: "", email: "" }
        );
        setErrors(errs);
      } else {
        setErrors({username: "", password: "", email: "" });
      }
      if (errors.length === 0) {
        handleReveal();
      }
    } else if (!signUp) {
      console.log("log in here");
      const result = await loginUser(username, password);
      console.log(result);  
      if (!result){
        const errs = {
          username: "Try again",
          password: "Try again",
        }
        setErrors(errs);
        console.log("login failed");
      } else {
        console.log("login success");
        window.location.reload()
      }
    }
    event.target.reset();
  };

  const topBoxStyles =
    "p-3 rounded-t-lg rounded-tr-lg hover:cursor-pointer hover:bg-[#342744] duration-200 ";
  const textBoxStyle = "text-black rounded-lg h-[75%] p-2";

  if (reveal)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627] aspect-square h-[70%] p-4 flex flex-col items-center rounded-lg">
          <div className="flex justify-between items-center w-[100%] font-semibold text-[#342744]">
            <div className="flex w-[45%]">
              <div
                className={`${topBoxStyles} ${
                  signUp ? "bg-[#342744] " : "bg-[#281E34]"
                }`}
                onClick={() => {
                  handleStyle(true);
                }}
              >
                {" Sign-Up"}
              </div>
              <div
                className={`${topBoxStyles} ${
                  signUp ? "bg-[#281E34]" : "bg-[#342744] "
                } w-[40%] text-center`}
                onClick={() => {
                  handleStyle(false);
                }}
              >
                {" Login"}
              </div>
            </div>
            <MdOutlineCancelPresentation
              className="text-4xl transition-all hover:fill-red-500 duration-200 cursor-pointer"
              fill={"#9882AC"}
              onClick={handleReveal}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-[#342744] flex flex-col gap-3 h-[100%] w-[100%] p-3 items-center rounded-lg rounded-tl-none"
          >
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-5 pt-9">
              <div>
                <div>{"Username"}</div>
                <input
                  type="text"
                  name="username"
                  placeholder={`${
                    errors.username == "" ? "usernameABC" : errors.username
                  }`}
                  className={`${textBoxStyle} ${
                    errors.username == ""
                      ? ""
                      : "placeholder-red-500  border-2 border-red-500"
                  }`}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>

              {signUp ? (
                <div>
                  <div>{"Email"}</div>
                  <input
                    type="text"
                    name="Email"
                    placeholder={`${
                      errors.email == "" ? "J@example.com" : errors.email
                    }`}
                    className={`${textBoxStyle} ${
                      errors.email == ""
                        ? ""
                        : "placeholder-red-500 border-2 border-red-500"
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              ) : (
                <></>
              )}

              <div>
                <div>{"Password"}</div>
                <input
                  type="text"
                  name="Password"
                  placeholder={`${
                    errors.password == "" ? "onetwothree" : errors.password
                  }`}
                  className={`${textBoxStyle} ${
                    errors.password == ""
                      ? ""
                      : "placeholder-red-500 border-2 border-red-500"
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button
                type="submit"
                className="w-[50%] h-[10%] bg-[#281E34] flex justify-center items-center duration-200 text-gray-300 hover:bg-green-600 rounded-lg"
              >
                {signUp ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};
export default SignUpModal;
