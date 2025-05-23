import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { reset } from "../features/PostSlice";
import { reset as imageReset } from "../features/UploadSlice";
type ActionBarProps = {
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  filterPost: boolean;
  setFilterPost: React.Dispatch<React.SetStateAction<boolean>>;
};
const ActionBar: React.FC<ActionBarProps> = ({
  setOrder,
  filterPost,
  setFilterPost,
}) => {
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
        <Button
          onClick={() => setFilterPost((state) => !state)}
          className={`rounded-md py-1 px-2 ${
            filterPost
              ? "bg-white text-indigo-500 border-2"
              : "bg-indigo-500  text-white"
          }`}
        >
          {filterPost ? "GET All Post" : "GET My Post"}
        </Button>
      </div>
      <Button onClick={handleClick}>Add Post</Button>
    </div>
  );

  return actionBar;
};

export default ActionBar;
