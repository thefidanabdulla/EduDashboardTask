import React, { useState } from "react";
import { useLoginMutation } from "../redux/services/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
      try {
        const { token } = await login(data).unwrap();
        Cookies.set("token", token);
        toast.success("Login successfully :)");
        navigate("/");
      } catch (error) {
        console.error("Failed to login:", error);
        toast.error("Username or Password was wrong!!");
      }
  })
  

  return (
    <div className="w-full min-h-screen bg-indigo-200 flex items-center justify-center p-4">
      <form
        className="max-w-[500px] w-full rounded-3xl bg-white bg-opacity-90 p-10 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h1 className="w-full text-center uppercase text-3xl text-indigo-300 font-semibold">
          Login
        </h1>
        <label className="text-gray-400 text-sm font-bold flex-1">
          UserName
          <input
            type="text"
            className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && (
            <span className="text-red-400 text-xs">
              {errors.username.message}
            </span>
          )}
        </label>
        <label className="text-gray-400 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <span className="text-red-400 text-xs">
              {errors.password.message}
            </span>
          )}
        </label>
        
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
