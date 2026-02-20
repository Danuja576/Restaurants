import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RestaurantCard = ({ restaurant, setRestaurants }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); 

    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      await api.delete(`/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((restaurant) => restaurant._id !== id)); 
      toast.success("Restaurant deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete restaurant");
    }
  };

  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-name text-base-content">{restaurant.name}</h3>
        <p className="text-base-content/70 line-clamp-3">{restaurant.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(restaurant.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, restaurant._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RestaurantCard;