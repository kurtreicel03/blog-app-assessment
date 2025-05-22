import React from "react";
import { useAppSelector } from "../hooks";

import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Posts: React.FC = () => {
  const { posts, loading, error } = useAppSelector((state) => state.post);
  const navigate = useNavigate();
  console.log(posts);
  const handleClick = (id: string) => {
    navigate(`/post/${id}`);
  };
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
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
