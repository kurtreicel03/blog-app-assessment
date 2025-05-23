import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { deletePost } from "./PostSlice";

const Post: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { post, loading } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.auth);

  const handleDelete = () => {
    dispatch(deletePost(post?.id));
    navigate("/");
    return;
  };

  const handleUpdate = () => {
    navigate("/post");
    return;
  };

  return (
    <div className="flex flex-col border-2 border-indigo-500 rounded-md px-10 py-10  gap-10 h-vh w-5xl">
      {loading ? (
        "Loading Post"
      ) : (
        <>
          <div className="font-bold text-4xl break-words">{post?.title}</div>
          <img
            alt="avatar"
            src={post?.imageUrl}
            className="h-1/2 rounded-md shadow-l w-full"
          />
          <div className="font-semibold text-xl break-words">
            {post?.description}
          </div>
          <div className="break-words">{post?.content}</div>
          <div className="italic">{post?.author}</div>
          {user?.id === post?.created_by && (
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleUpdate}
                className="mt-auto mb-5 self-end border-2 border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
              >
                Update Post
              </Button>
              <Button
                onClick={handleDelete}
                className="mt-auto mb-5 self-end border-2 border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
              >
                Delete Post
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
