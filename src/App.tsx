import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser } from "./features/AuthSlice";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import BlogPost from "./pages/BlogPost";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      dispatch(setUser(data.session?.user ?? null));
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setUser(session?.user ?? null));
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/post"
          element={user ? <BlogPost action="post" /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/post/:id"
          element={user ? <BlogPost action="view" /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
