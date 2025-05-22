import React, { useState } from "react";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { signup } from "./AuthSlice";

const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
  };

  const form = (
    <div className="w-90 mx-auto bg-indigo-500 p-5  rounded-xl shadow-2xl">
      <div className="text-center text-xl text-white">
        WELCOME TO BLOG POST 👋
      </div>
      <form className="flex flex-col gap-10 p-10" onSubmit={handleSubmit}>
        <input
          className="border-b-2 border-b-white text-white text-lg focus:outline-none hover:border-b-green-500 focus: border-b-green-500"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="text-white hover:text-green-500 cursor-pointer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );

  return form;
};

export default SignupForm;
