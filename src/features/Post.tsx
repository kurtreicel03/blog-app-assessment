import React, { useEffect } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { fetchPostById } from "./PostSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useAppSelector((state) => state.post.posts);

  const { title, description, content, author, imageUrl } = post[0];

  console.log(title, description, content, author, imageUrl);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = () => {
    navigate("/post");
    return;
  };

  return (
    <div className="flex flex-col border-2 border-indigo-500 rounded-md px-10 pt-10  gap-10 h-vh w-5xl">
      <div className="font-bold text-4xl break-words">{title}</div>
      <img
        alt="avatar"
        src={imageUrl}
        className="h-1/2 rounded-md shadow-l w-full"
      />

      <div className="font-semibold text-xl break-words">{description}</div>

      <div className="break-words">{content}</div>

      <div className="italic">{author}</div>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSubmit}
          className="mt-auto mb-10 self-end border-2 border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
        >
          Update Post
        </Button>
        <Button
          onClick={handleSubmit}
          className="mt-auto mb-10 self-end border-2 border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
        >
          Delete Post
        </Button>
      </div>
    </div>
  );
};

export default Post;
