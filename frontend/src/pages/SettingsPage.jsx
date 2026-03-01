import React, { useState, useEffect } from "react";
import { UpdateProfile } from "../frontendAPI";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const SettingsPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await UpdateProfile({ id: userInfo._id, name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPassword("");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!userInfo) {
    return <div className="text-center mt-20 text-white">Please log in to view settings.</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6 w-full max-w-md">
          <h2 className="text-2xl text-white font-bold border-b border-gray-700 pb-2">Settings</h2>
          
          <div className="flex flex-col gap-2 border-b border-gray-700 pb-4">
            <h3 className="text-lg text-primary font-semibold">Appearance</h3>
            <div className="flex items-center justify-between text-gray-300">
              <span>Theme Mode</span>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white outline-none cursor-pointer"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <h3 className="text-lg text-primary font-semibold">User Details</h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="password"
              placeholder="New Password (leave blank to keep current)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white outline-none"
            />
            <button type="submit" className="bg-primary text-white p-2 rounded hover:opacity-90 transition mt-2">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;