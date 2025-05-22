import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { uploadImage, reset } from "./UploadSlice";

const PostImage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { imageUrl } = useAppSelector((state) => state.upload);
  const { posts } = useAppSelector((state) => state.post);
  const viewUrl =
    preview ?? imageUrl ?? (posts.length > 0 && posts[0].imageUrl);

  useEffect(() => {
    dispatch(reset());
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Cleanup URL object on unmount or file change
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      dispatch(uploadImage(e.target.files[0]));
    }
  };
  console.log(preview);
  return (
    <div>
      {viewUrl ? (
        <>
          <label htmlFor="imageUrl" className="w-full cursor-pointer ">
            <img
              src={viewUrl}
              alt="avatar"
              className="rounded-md hover:border-green-500 hover:border-2 focus:border-green-500"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="imageUrl"
            name="imageUrl"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <label
            htmlFor="image"
            className="border-2 h-full border-gray-500 rounded-md w-full flex items-center justify-center cursor-pointer m-auto hover:border-green-500 focus:border-green-500 "
          >
            Upload Image 📸
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default PostImage;
