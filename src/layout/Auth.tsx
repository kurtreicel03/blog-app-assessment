import React from "react";
import type { ReactNode } from "react";
import Navbar from "../components/NavBar";
interface AuthProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  const layout = (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </div>
  );
  return layout;
};

export default AuthLayout;
