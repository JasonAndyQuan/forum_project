import { Outlet, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useState, useEffect } from "react";
import AuthButton from "../components/AuthButton";
import SignUpModal from "../components/SignUpModal";
import { getSession, logOut } from "../utils/api";
const Nav = () => {
  const [reveal, setReveal] = useState(false);
  const [auth, setAuth] = useState({}); //false -> login / signup  true -> logout
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    resetAuth();
  };
  const resetAuth = () => {
    setAuth({});
  };
  useEffect(() => {
    const checker = async () => {
      const { user } = await getSession();
      console.log(user);
      if (!user) {
        resetAuth();
      } else {
        setAuth(user);
      }
    };
    checker();
  }, []);
  const handleProfileClick = () => {
    if (auth.username) {
      navigate(`/users/${auth.userid}`);
    } else {
      handleReveal();
    }
  }
  const handleReveal = () => {
    const bool = !reveal;
    setReveal(bool);
  };

  return (
    <>
      <SignUpModal reveal={reveal} handleReveal={handleReveal} />
      <div className="bg-[#281E34] h-screen flex flex-col">
        <div className="h-[50px] bg-[#1E1627] w-screen flex items-center justify-between p-5 pr-3">
          <div className="w-[5rem] flex items-center justify-between">
            <a href="/">
              <IoMdHome size="2rem" className="hover:fill-[#e2e2b6a9]" />
            </a>
            <div>
              <div onClick={handleProfileClick} className="hover:cursor-pointer">
                <FaUserAlt size="1.5rem" className="hover:fill-[#e2e2b6a9]" />
              </div>
            </div>
          </div>
          <div className="w-[15rem]">
            <AuthButton
              auth={auth}
              handleReveal={handleReveal}
              handleLogOut={handleLogOut}
            />
          </div>
        </div>
        <Outlet context={{ reveal, auth, handleReveal }} />
        <div className="h-1 w-full"> </div>
      </div>
    </>
  );
};

export default Nav;
