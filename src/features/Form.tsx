import React, { useState } from "react";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createPost, updatePost } from "./PostSlice";
import PostImage from "./Image";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

interface Updates {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  imageUrl: string | null;
}

const BlogForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { imageUrl } = useAppSelector((state) => state.upload);
  const { post, loading } = useAppSelector((state) => state.post);

  const [title, setTitle] = useState<string>(post?.title || "");
  const [description, setDescription] = useState<string>(
    post?.description || ""
  );
  const [content, setContent] = useState<string>(post?.content || "");
  const [author, setAuthor] = useState<string>(post?.author || "Anonymous");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post) {
      const updates: Updates = {
        id: post.id,
        title: title !== post.title ? title : "",
        description: description !== post.description ? description : "",
        content: content !== post.content ? content : "",
        author: author !== post.author ? author : "",
        imageUrl: imageUrl !== post.imageUrl ? imageUrl : null,
      };

      dispatch(updatePost(updates));
    } else {
      dispatch(
        createPost({
          title,
          description,
          content,
          author,
          imageUrl,
        })
      );
    }

    navigate(`/post/${post?.id}`);
  };

  const form = (
    <form
      className="flex flex-col border-2 border-indigo-500 rounded-md p-10  gap-10 h-vh w-5xl"
      onSubmit={handleFormSubmit}
    >
      {!loading ? (
        <>
          <input
            className="border-b-indigo-500  font-bold text-4xl focus:outline-none hover:border-b-green-500 hover:border-b-2 focus:border-b-green-500 focus:border-b-2"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="TITLE"
          />
          {<PostImage />}
          <textarea
            className="font-semibold text-xl  hover:border-b-green-500 hover:border-b-2 focus: border-b-green-500 focus:border-b-2 focus:outline-none"
            rows={6}
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="DESCRIPTION"
          />
          <textarea
            className="font-medium text-l mb-10  hover:border-b-green-500 hover:border-b-2 focus: border-b-green-500 focus:border-b-2  focus:outline-none"
            rows={20}
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="CONTENT"
          />
          <input
            className="border-b-indigo-500 italic focus:outline-none hover:border-b-green-500 hover:border-b-2 focus:border-b-green-500 focus:border-b-2"
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="author"
          />
          <Button
            type="submit"
            className="mt-auto mb-5 self-end border-2 border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
          >
            Save
          </Button>{" "}
        </>
      ) : (
        <Loader />
      )}
    </form>
  );

  return form;
};

export default BlogForm;
