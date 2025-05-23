import React from "react";
import Button from "./Button";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../features/AuthSlice";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavBarProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-indigo-500 text-white px-30 py-3 flex justify-between items-center ">
      <Link to="/" className="text-xl font-bold cursor-pointer">
        BLOG POST <span className="text-3xl">🔖</span>
      </Link>

      {user && (
        <>
          {children}

          <Button
            onClick={handleLogout}
            className="border-2 rounded-md p-1 hover:bg-white hover:border-green-500 hover:text-indigo-500 "
          >
            log out
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
