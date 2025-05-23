import HomeLayout from "../layout/HomeLayout";
import ActionBar from "../components/ActionBar";
import Pagination from "../components/Pagination";
import Posts from "../features/Posts";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState, useEffect } from "react";
import { fetchPosts } from "../features/PostSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [filterPost, setFilterPost] = useState<boolean>(false);

  const { total } = useAppSelector((state) => state.post);
  const { user } = useAppSelector((state) => state.auth);

  const pageSize = 10;
  const totalPage = Math.ceil(total / 10);
  const start = (page - 1) * pageSize;
  const end = page * pageSize - 1;

  useEffect(() => {
    dispatch(
      fetchPosts({
        search,
        sortOrder: order,
        start: start,
        end: end,
        created_by: filterPost ? user?.id : undefined,
      })
    );
  }, [dispatch, page, end, start, order, search, filterPost, user?.id]);

  return (
    <>
      <Navbar>
        <SearchBar search={search} handleChange={setSearch} />
      </Navbar>
      <HomeLayout>
        {
          <>
            <ActionBar
              setOrder={setOrder}
              filterPost={filterPost}
              setFilterPost={setFilterPost}
            />
            <Posts />
            <Pagination page={page} totalPage={totalPage} setPage={setPage} />
          </>
        }
      </HomeLayout>
    </>
  );
};

export default HomePage;
