import React from "react";
import type { ReactNode } from "react";
interface AuthProps {
  children: ReactNode;
}

const HomeLayout: React.FC<AuthProps> = ({ children }) => {
  const layout = (
    <div>
      <div className="m-20 p-10">{children}</div>
    </div>
  );
  return layout;
};

export default HomeLayout;
