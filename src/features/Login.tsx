import React, { useState } from "react";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../features/AuthSlice";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));

    if (!error) navigate("/");
  };

  const form = (
    <div className="w-90 mx-auto bg-indigo-500 p-5 rounded-xl shadow-2xl">
      <div className="text-center text-xl text-white">
        WELCOME TO BLOG POST 👋
      </div>
      <form className="flex flex-col gap-10 p-10" onSubmit={handleSubmit}>
        <input
          className="border-b-2 border-b-white text-white text-lg focus:outline-none  hover:border-b-green-500 focus: border-b-green-500"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="border-b-2 border-b-white text-white text-lg focus:outline-none hover:border-b-green-500 focus: border-b-green-500"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button
          type="submit"
          className={`text-white text-2xl  hover:rounded-full hover:bg-white hover:text-indigo-500`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="text-white hover:text-green-500 cursor-pointer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );

  return form;
};

export default LoginForm;
