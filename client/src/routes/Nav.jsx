import { Outlet, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import AuthButton from "../components/AuthButton";
import SignUpModal from "../components/SignUpModal";

const Nav = () => {

  const [reveal, setReveal] = useState(false);
  const [auth, setAuth] = useState(false); //false -> login / signup  true -> logout

  const handleReveal = () => {
    const bool = !reveal;
    setReveal(bool);
  };
  const handleAuth = () => {
    const bool = !auth;
    setAuth(bool);
  };

  return (
    <>
      <SignUpModal reveal={reveal} handleReveal={handleReveal} handleAuth={handleAuth}/>
      <div className="h-[50px] bg-[#1E1627] w-[100%] flex items-center justify-between p-5 pt-7">
        <div className="w-[5%] flex items-center justify-between">
          <Link to="/">
            <IoMdHome size="2rem" className="hover:fill-[#e2e2b6a9]" />
          </Link>
          <div>
            <Link to="/">
              <FaUserAlt size="1.5rem" className="hover:fill-[#e2e2b6a9]" />
            </Link>
          </div>
        </div>
        <div className="w-[15%]">
          <AuthButton auth={auth} handleReveal={handleReveal}/>
        </div>
      </div>
      <Outlet context={{reveal}}/>
    </>
  );
};

export default Nav;
