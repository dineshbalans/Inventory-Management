import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { register } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(username, password);
      console.log(data);
      // setToken(data.token);
      if (data.statusCode === 200 || data.statusCode === 201) {
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <h1 className="text-gray-800 font-bold text-2xl mb-7">Register!</h1>
      {/* <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p> */}
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <FaUser className="text-gray-400" />
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <FaLock className="text-gray-400" />
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="block w-full bg-primary mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      >
        Register
      </button>
      <Link
        className="text-sm ml-2 hover:text-primary cursor-pointer"
        to="/user/login"
      >
        Alerady a User? Login
      </Link>
    </form>
  );
};

export default RegisterPage;
