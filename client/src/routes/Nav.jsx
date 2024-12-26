import { Outlet, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useState, useEffect } from "react";
import AuthButton from "../components/AuthButton";
import SignUpModal from "../components/SignUpModal";
import { getSession, logOut } from "../utils/api";

const Nav = () => {
  const [reveal, setReveal] = useState(false);
  const [auth, setAuth] = useState({ username: "" }); //false -> login / signup  true -> logout

  const handleLogOut = async () => {
    await logOut();
    resetAuth();
  };
  const resetAuth = () => {
    setAuth({ username: "" });
  };
  useEffect(() => {
    const checker = async () => {
      const { user } = await getSession();
      // console.log(user);
      if (!user) {
        resetAuth();
      } else {
        setAuth(user);
      }
    };
    checker();
    // console.log(auth);
  }, []);

  const handleReveal = () => {
    const bool = !reveal;
    setReveal(bool);
  };

  return (
    <>
      <SignUpModal reveal={reveal} handleReveal={handleReveal} />
      <div className="bg-[#281E34] h-screen flex flex-col">
        <div className="h-[50px] bg-[#1E1627] w-[100%] flex items-center justify-between p-5 pt-7">
          <div className="w-[5%] flex items-center justify-between">
            <a href="/">
              <IoMdHome size="2rem" className="hover:fill-[#e2e2b6a9]" />
            </a>
            <div>
              <Link to={`/users/${auth.userid}`}>
                <FaUserAlt size="1.5rem" className="hover:fill-[#e2e2b6a9]" />
              </Link>
            </div>
          </div>
          <div className="w-[15%]">
            <AuthButton
              auth={auth}
              handleReveal={handleReveal}
              handleLogOut={handleLogOut}
            />
          </div>
        </div>
        <Outlet context={{ reveal, auth }} />
        <div className="h-1 w-full"> </div>
      </div>
    </>
  );
};

export default Nav;
