import { useState, useRef, useEffect } from "react";
import { PlusIcon, ClipboardListIcon, UserCircle, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsPanelOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10 relative">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="text-3xl font-bold text-primary font-mono tracking-tighter">ThinkBoard</Link>
          
          <div className="flex items-center gap-4">
            <Link to={"/bookings"} className="btn btn-ghost gap-2 hidden md:flex"> 
              <ClipboardListIcon className="size-5"/>
              <span>Bookings</span>
            </Link>
            
            <Link to={"/create"} className="btn btn-primary btn-sm md:btn-md">
              <PlusIcon className="size-5"/>
              <span className="hidden sm:inline">New Restaurant</span>
            </Link>

            <button 
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="btn btn-ghost btn-circle"
            >
              <UserCircle className={`size-7 ${userInfo ? 'text-primary' : 'text-gray-400'}`}/>
            </button>
          </div>
        </div>
      </div>

      {isPanelOpen && (
        <div className="absolute right-4 top-16 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in duration-200">
          {userInfo ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <User className="text-primary size-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-medium truncate">{userInfo.name}</p>
                  <p className="text-gray-400 text-xs truncate">{userInfo.email}</p>
                </div>
              </div>
              
              <Link to="/bookings" onClick={() => setIsPanelOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm py-1">
                <ClipboardListIcon className="size-4" /> My Bookings
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm py-1 w-full text-left"
              >
                <LogOut className="size-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm mb-2">Welcome! Sign in to manage restaurants.</p>
              <Link to="/login" onClick={() => setIsPanelOpen(false)} className="btn btn-primary btn-sm w-full">Login</Link>
              <Link to="/register" onClick={() => setIsPanelOpen(false)} className="btn btn-outline btn-sm w-full">Create Account</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;