import { Outlet, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Nav = () => {
  return (
    <>
      <div className="h-[40px] bg-[#1E1627] w-[100%] p-6 items-center justify-between flex">
        <Link to="/">
          <IoMdHome size="2rem" className="hover:fill-[#e2e2b6a9]" />
        </Link>
        <div>
          <Link to="/">
            <FaUserAlt size="1.5rem" className="hover:fill-[#e2e2b6a9]" />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
