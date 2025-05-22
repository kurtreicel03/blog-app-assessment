import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { reset } from "../features/PostSlice";
type ActionBarProps = {
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};
const ActionBar: React.FC<ActionBarProps> = ({ setOrder }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(reset());
    navigate("/post");
  };
  const actionBar = (
    <div className="flex justify-between items-center w-full mb-8">
      <Button
        onClick={() => setOrder((order) => (order === "asc" ? "desc" : "asc"))}
      >
        ↑↓
      </Button>
      <Button onClick={handleClick}>Add Post</Button>
    </div>
  );

  return actionBar;
};

export default ActionBar;
