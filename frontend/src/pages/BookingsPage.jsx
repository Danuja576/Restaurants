import { useState, useEffect } from "react";
import api from "../lib/axios";
import { LoaderIcon, CalendarIcon, ArrowLeftIcon, UtensilsIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { GetAllBookings } from "../frontendAPI";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const res = await GetAllBookings();
        setBookings(res.data);
      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <LoaderIcon className="animate-spin size-10 text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto mb-6">
          <Link to="/" className="btn btn-ghost gap-2">
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>
        </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <CalendarIcon className="text-primary" />
            Customer Bookings
            </h1>

            <div className="overflow-x-auto shadow-xl rounded-box">
            <table className="table bg-base-100">
                <thead className="bg-base-300">
                <tr>
                    <th>Customer Name</th>
                    <th>Restaurant</th>
                    <th>Selected Section</th>
                    <th>Phone No</th>
                    <th>Booking Date</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking._id} className="hover">
                    <td className="font-bold">{booking.bookedBy}</td>
                    <td>
                        <div className="flex items-center gap-2">
                        <UtensilsIcon size={14} className="text-primary" />
                        {booking.restaurantId?.name || "N/A"}
                        </div>
                    </td>
                    <td>
                        <span className="badge badge-primary font-semibold">{booking.sectionId?.name || "Unknown"}</span>
                    </td>
                    <td>{booking.phoneNo}</td>
                    <td>
                      {booking.bookingDate 
                          ? new Date(booking.bookingDate).toLocaleDateString() 
                          : "Not Specified"}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {bookings.length === 0 && (
                <div className="text-center p-10 bg-base-100">No active bookings found.</div>
            )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default BookingsPage;