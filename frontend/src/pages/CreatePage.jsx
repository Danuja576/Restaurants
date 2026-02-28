import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { PostRestaurant } from "../frontendAPI";

const CreatePage = () => {
  const [name,setName] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(content);
    if(!name.trim() || !content.trim()){
      toast.error("All field are required")
      return;
    }

    setLoading(true)
    try {
      const data = {
        name,
        content
      }
      await PostRestaurant(data);
      
      toast.success("Restaurant created successfully!")
      return navigate("/");
    } catch (error) {
      console.log("Error creating restaurant",error);
      toast.error("Failed to create restaurant")
    }
  };

  return (
    <div className = "min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5"/>
                Back to Restaurants
            </Link>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-name text-2xl mb-4">Create New Restaurant</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label-text">
                      <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                      placeholder="Restaurant Name"
                      className=" input input-bordered"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Write restaurant content here..."
                      className=" textarea textarea-bordered h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Creating..." : "Create Restaurant"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CreatePage;
