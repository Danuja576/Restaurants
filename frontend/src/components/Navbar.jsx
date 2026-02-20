import { PlusIcon,ClipboardListIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="text-3xl font-bold text-primary font-mono tracking-tighter">ThinkBoard</Link>
          <div className="flex items-center gap-4">
            
            <Link to={"/bookings"} className="btn btn-ghost gap-2">
              <ClipboardListIcon className="size-5"/>
              <span>Bookings</span>
            </Link>
            
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5"/>
              <span>New Restaurant</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;