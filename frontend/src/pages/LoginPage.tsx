import React, { useState } from "react";
import { useLoginMutation } from "../redux/services/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length == 0 || password.length == 0) {
      toast.error("Please fill all fields!!");
    } else {
      try {
        const { token } = await login({ username, password }).unwrap();
        Cookies.set("token", token);
        toast.success("Login successfully :)");
        navigate("/");
      } catch (error) {
        console.error("Failed to login:", error);
        toast.error("Username or Password was wrong!!");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-indigo-200 flex items-center justify-center p-4">
      <form
        className="max-w-[500px] w-full rounded-3xl bg-white bg-opacity-90 p-10 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="w-full text-center uppercase text-3xl text-indigo-300 font-semibold">
          Login
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-500 text-lg">Username:</label>
          <input
            className="w-full rounded-xl p-4 border border-indigo-100 outline-none text-base placeholder:text-indigo-300"
            placeholder="Enter the username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-500 text-lg">Password:</label>
          <input
            className="w-full rounded-xl p-4 border border-indigo-100 outline-none text-base placeholder:text-indigo-300"
            placeholder="Enter the password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full py-4 text-lg rounded-lg outline-none bg-indigo-300 text-white font-semibold"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
        <p className="font-medium text-sm text-indigo-400">
          Not Registered?{" "}
          <Link to={"/register"} className="underline ml-1 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
