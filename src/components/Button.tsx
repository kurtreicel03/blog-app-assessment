import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "bg-indigo-500 rounded-md text-white py-1 px-3",
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
