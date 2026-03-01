import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { RegisterUser } from "../frontendAPI";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const { data } = await RegisterUser({ name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Account created successfully!");
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96">
        <h2 className="text-2xl text-white font-bold text-center">Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
          required
        />
        <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition">
          Register
        </button>
        <p className="text-gray-400 text-sm text-center">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;