import React, { useState } from "react";
import { useNavigate,Link } from "react-router";
import { LoginUser } from "../frontendAPI";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await LoginUser({ email, password });
      // Store the token in local storage so the user stays logged in
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96">
        <h2 className="text-2xl text-white font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
          required
        />
        <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition">
          Login
        </button>
        <p className="text-gray-400 text-sm text-center">
            Create an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;