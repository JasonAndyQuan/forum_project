import { useState, useRef } from "react";
import { createUser, loginUser } from "../utils/api";
import { MdOutlineCancelPresentation } from "react-icons/md";

const SignUpModal = ({ reveal, handleReveal }) => {
  const [errors, setErrors] = useState({});
  const [signUp, setSignUp] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStyle = (bool) => {
    setErrors({});
    setSignUp(bool);
  };

  const handleLogin = async () => {
    const result = await loginUser(
      usernameRef.current.value,
      passwordRef.current.value
    );
    console.log(result);
    if (!result) {
      const errs = {
        username: "Try again",
        password: "Try again",
      };
      setErrors(errs);
      console.log("login failed");
    } else {
      console.log("login success");
      // window.location.reload();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signUp) {
      console.log("sign up here");
      const { errors } = await createUser(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(errors);
      if (errors.length !== 0) {
        const errs = errors.reduce((acc, item) => {
          acc[item.path] = item.msg;
          return acc;
        }, {});
        setErrors(errs);
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        emailRef.current.value = "";
        event.target.reset();
      } else {
        setErrors({});
      }
      if (errors.length === 0) {
        console.log("success");
        handleStyle(false);
      }
    } else if (!signUp) {
      console.log("log in here");
      await handleLogin();
    }
  };
  const topBoxStyles = "p-3 rounded-t-lg rounded-tr-lg  duration-200 ";
  const toggled = "bg-[#342744]";
  const untoggled = " bg-[#281E34] hover:cursor-pointer hover:bg-[#342744]";
  const textBoxStyle =
    "text-black rounded-md h-[75%] p-2 focus:outline-none w-full min-w-[5rem] bg-gray-300";

  if (reveal)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center">
        <div className="bg-[#1E1627]  min-w-[20rem] w-[30rem] h-[70%] p-4 flex flex-col items-center rounded-lg">
          <div className="flex justify-between items-center w-[100%] font-semibold text-[#342744]">
            <div className="flex w-[45%] text-base">
              <div
                className={`${topBoxStyles} ${
                  signUp ? untoggled : toggled
                } w-[40%] min-w-[5rem] text-center`}
                onClick={() => {
                  handleStyle(false);
                }}
              >
                {"Login"}
              </div>
              <div
                className={`${topBoxStyles} ${
                  signUp ? toggled : untoggled
                } min-w-[5rem] `}
                onClick={() => {
                  handleStyle(true);
                }}
              >
                {" Sign-Up"}
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
            className="bg-[#342744] flex flex-col gap-3 h-[100%] w-[100%] p-3 items-start rounded-lg rounded-tl-none"
          >
            <div className="w-[100%] p-4 h-[100%] flex flex-col items-start gap-5 pt-9">
              <div className="w-full">
                <div>{"Username"}</div>
                <input
                  ref={usernameRef}
                  type="text"
                  name="username"
                  placeholder={`${
                    errors.username ? errors.username : "usernameABC"
                  }`}
                  className={`${textBoxStyle} ${
                    errors.username
                      ? "placeholder-red-500  border-2 border-red-500"
                      : ""
                  }`}
                  onClick={() => {
                    setErrors({ ...errors, username: null });
                  }}
                ></input>
              </div>
              <div className="w-full">
                <div>{"Password"}</div>
                <input
                  ref={passwordRef}
                  type={`${signUp ? "text" : "password"}`}
                  name="Password"
                  placeholder={`${
                    errors.password ? errors.password : "onetwothree"
                  }`}
                  className={`${textBoxStyle} ${
                    errors.password
                      ? "placeholder-red-500 border-2 border-red-500"
                      : ""
                  }`}
                  onClick={() => {
                    setErrors({ ...errors, password: null });
                  }}
                ></input>
              </div>
              {signUp ? (
                <div className="w-full">
                  <div>{"Email"}</div>
                  <input
                    ref={emailRef}
                    type="text"
                    name="Email"
                    placeholder={`${
                      errors.email ? errors.email : "J@example.com"
                    }`}
                    className={`${textBoxStyle} ${
                      errors.email
                        ? "placeholder-red-500 border-2 border-red-500"
                        : ""
                    }`}
                    onClick={() => {
                      setErrors({ ...errors, email: null });
                    }}
                  ></input>
                </div>
              ) : (
                <></>
              )}
              <button
                type="submit"
                className="w-full min-w-[5rem] h-[15%] bg-[#281E34] flex justify-center items-center duration-200 text-gray-300 hover:bg-green-600 rounded-lg"
              >
                {signUp ? "Sign Up" : "Login"}
              </button>
              {signUp ? (
                <div></div>
              ) : (
                <div className="bg-[#281E34] rounded-lg p-3 flex flex-col min-w-[40%] text-sm">
                  <h1 className="border-b-2 border-gray-2">
                    {"Demo Credentials"}
                  </h1>
                  <div className="flex gap-1">
                    <p> {"Username:"} </p>
                    <p className="text-blue-400"> {"User123"} </p>
                  </div>
                  <div className="flex gap-1">
                    <p> {"Username:"} </p>
                    <p className="text-green-400"> {"Password123"} </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
};
export default SignUpModal;
