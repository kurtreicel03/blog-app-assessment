import Post from "../features/Post";
import BlogForm from "../features/Form";
import HomeLayout from "../layout/HomeLayout";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
type PostPageProps = {
  action?: "post" | "view";
};

const BlogPost: React.FC<PostPageProps> = ({ action }) => {
  const blogPost = (
    <>
      <Navbar />

      <HomeLayout>
        <div className="flex flex-col justify-center items-center ">
          <Link
            to="/"
            className="w-20 border-2 border-indigo-500 rounded-full p-1 text-indigo-500 font-bold ml-235 mb-5 text-center "
          >
            ❌
          </Link>
          {action === "view" ? <Post /> : <BlogForm />}
        </div>
      </HomeLayout>
    </>
  );

  return blogPost;
};

export default BlogPost;
