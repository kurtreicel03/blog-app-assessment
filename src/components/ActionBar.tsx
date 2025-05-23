import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { reset } from "../features/PostSlice";
import { reset as imageReset } from "../features/UploadSlice";
type ActionBarProps = {
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};
const ActionBar: React.FC<ActionBarProps> = ({ setOrder }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(reset());
    dispatch(imageReset());

    navigate("/post");
  };

  const actionBar = (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex space-x-4">
        <Button
          onClick={() =>
            setOrder((order) => (order === "asc" ? "desc" : "asc"))
          }
        >
          ↑↓
        </Button>
        <Button onClick={handleClick}>My Post</Button>
      </div>
      <Button onClick={handleClick}>Add Post</Button>
    </div>
  );

  return actionBar;
};

export default ActionBar;
