import React from "react";
import { useAppSelector } from "../hooks";

import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { fetchPostById } from "./PostSlice";

const Posts: React.FC = () => {
  const { posts, loading, error } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    dispatch(fetchPostById(id));
    navigate(`/post/${id}`);
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>No posts available.</div>;
  return (
    <div className="grid grid-cols-5 gap-10">
      {posts.map((post) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            author={post.author}
            onClick={() => handleClick(post.id)}
          />
        );
      })}
    </div>
  );
};

export default Posts;
