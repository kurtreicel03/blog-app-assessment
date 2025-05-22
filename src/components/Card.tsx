import React from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl: string | null | undefined;
  author: string;
  className?: string;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  author,
  className = "",
  onClick,
}) => {
  const limitString = (str: string, strLimit: number = 15): string => {
    return str.length > strLimit ? `${str.substring(0, strLimit)}...` : str;
  };
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer max-w-sm rounded ring-1 ring-indigo-800 overflow-hidden shadow-lg bg-white transition transform hover:shadow-2xl hover:-translate-y-1 hover:scale-105 duration-300  ${className}`}
    >
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      )}
      <div className="py-3 px-2">
        <h2 className="font-bold text-xl mb-2">{limitString(title)}</h2>
        <p className="text-gray-700 text-base">
          {limitString(description, 25)}
        </p>
        <p className="text-sm italic">Author: {limitString(author)}</p>
      </div>
    </div>
  );
};

export default Card;
