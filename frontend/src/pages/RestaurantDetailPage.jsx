import { useState ,useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, PlusIcon ,UserIcon,PhoneIcon,CalendarIcon } from 'lucide-react';

const RestaurantDetailPage = () => {
  const [restaurant,setRestaurant] = useState(null);
  const [loading,setLoading] = useState(true)
  const [saving,setSaving] = useState(false)

  const [sections, setSections] = useState([]);
  const [restaurantBookings, setRestaurantBookings] = useState([]);
  const [selectedSectionIds, setSelectedSectionIds] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionCount, setNewSectionCount] = useState("");
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRestaurant, resSections, resBookings] = await Promise.all([
            api.get(`/restaurants/${id}`),
            api.get(`/restaurants/${id}/sections`),
            api.get(`/restaurants/${id}/bookings`)
        ]);

        setRestaurant(resRestaurant.data);
        setSections(resSections.data);
        setRestaurantBookings(resBookings.data);
      } catch (error) {
        console.log("Error fetching data", error);
        toast.error("Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isSectionBookedOnSelectedDate = (sectionId) => {
    return restaurantBookings.some(booking => {
      const bookingDateStr = new Date(booking.bookingDate).toISOString().split('T')[0];
      return booking.sectionId === sectionId && bookingDateStr === selectedDate;
    });
  };
  const handleAddSection = async (e) => {
    e.preventDefault();
    if(!newSectionName || !newSectionCount) return toast.error("Fill in section details");

    try {
        const res = await api.post('/restaurants/sections', {
            restaurantId: id,
            name: newSectionName,
            count: Number(newSectionCount)
        });
        setSections([...sections, res.data]);
        setNewSectionName("");
        setNewSectionCount("");
        toast.success("Section added!");
    } catch (error) {
        console.error(error);
        toast.error("Failed to add section");
    }
  };

  const handleBookingSubmit = async () => {
    if(!customerName || !customerPhone || !selectedDate) return toast.error("All fields are required");

    try {
        const res = await api.put(`/restaurants/sections/book`, { 
          sectionIds: selectedSectionIds,
          bookedBy: customerName,
          phoneNo: customerPhone,
          bookingDate: selectedDate,
          restaurantId: id
      });

        const newBookings = selectedSectionIds.map(secId => ({
            sectionId: secId,
            bookingDate: selectedDate,
            restaurantId: id
        }));
        
        setRestaurantBookings(prev => [...prev, ...newBookings]);
        
        setIsBookingModalOpen(false);
        setCustomerName("");
        setCustomerPhone("");
        setSelectedSectionIds([]);
        toast.success("Section Booked Successfully!");
    } catch (error) {
        console.error(error);
        toast.error("Booking Failed");
    }
  };

  const handleDelete = async ()=>{
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      await api.delete(`/restaurants/${id}`);
      toast.success("Restaurant deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the restaurant:", error);
      toast.error("Failed to delete restaurant");
    }
  };
  const toggleSectionSelection = (id) => {
    setSelectedSectionIds((prev) => 
        prev.includes(id) 
            ? prev.filter(itemId => itemId !== id) 
            : [...prev, id]
    );
  };
  const handleSave = async () => {
    if (!restaurant.name.trim() || !restaurant.content.trim()) {
      toast.error("Please add a name or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/restaurants/${id}`, restaurant);
      toast.success("Restaurant updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the restaurant:", error);
      toast.error("Failed to update restaurant");
    } finally {
      setSaving(false);
    }
  };
  
  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-base-200 relative'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Restaurants
            </Link>
            <div className="flex gap-2">
                <button 
                    disabled={selectedSectionIds.length === 0} 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="btn btn-success text-white"
                >
                    Book {selectedSectionIds.length > 0 && `(${selectedSectionIds.length})`} Now
                </button>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                    <Trash2Icon className="h-5 w-5" /> Delete
                </button>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Name</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={restaurant.name}
                  onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Content</span></label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  value={restaurant.content}
                  onChange={(e) => setRestaurant({ ...restaurant, content: e.target.value })}
                />
              </div>

              <div className="divider">Sections & Availability</div>
              
              <div className="bg-base-200 p-4 rounded-3xl border border-white/20">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-end">
                        <div className="form-control flex-1">
                            <label className="label-text text-xs mb-1">Section Name</label>
                            <input 
                                type="text" 
                                className="input input-sm input-bordered"
                                value={newSectionName}
                                onChange={(e) => setNewSectionName(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-24">
                            <label className="label-text text-xs mb-1">Capacity</label>
                            <input 
                                type="number" 
                                className="input input-sm input-bordered"
                                value={newSectionCount}
                                onChange={(e) => setNewSectionCount(e.target.value)}
                            />
                        </div>
                        <button onClick={handleAddSection} className="btn btn-sm btn-primary">
                            <PlusIcon className="size-4"/> Add
                        </button>
                    </div>

                    <div className="form-control w-full mt-4 bg-base-100 p-3 rounded-xl shadow-sm">
                        <label className="label py-1"><span className="label-text font-bold flex gap-2 items-center"><CalendarIcon size={16}/> Check Availability For:</span></label>
                        <input 
                            type="date" 
                            className="input input-bordered" 
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setSelectedSectionIds([]); 
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {sections.map((section) => {
                            const isBooked = isSectionBookedOnSelectedDate(section._id);
                            
                            return (
                              <button
                                  key={section._id}
                                  onClick={() => !isBooked && toggleSectionSelection(section._id)}
                                  disabled={isBooked}
                                  className={`
                                      btn h-auto py-3 flex flex-col gap-1 border-2
                                      ${isBooked 
                                          ? 'btn-error cursor-not-allowed opacity-80' 
                                          : selectedSectionIds.includes(section._id) 
                                              ? 'btn-primary border-primary ring-2 ring-primary ring-offset-1' 
                                              : 'btn-outline border-base-300'
                                      }
                                  `}
                              >
                                  <span className="font-bold text-lg">{section.name}</span>
                                  <span className="text-xs opacity-80">Capacity: {section.count}</span>
                                  {isBooked && <span className="text-xs font-bold bg-white/20 px-2 rounded">BOOKED</span>}
                              </button>
                            );
                        })}
                    </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card bg-base-100 w-96 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="card-body">
                    <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
                    <p className="text-sm opacity-70 mb-4">Booking for date: <strong>{selectedDate}</strong></p>
                    
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text flex gap-2 items-center"><UserIcon size={16}/> Customer Name</span></label>
                        <input 
                            type="text" 
                            className="input input-bordered" 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-control w-full mt-3">
                        <label className="label"><span className="label-text flex gap-2 items-center"><PhoneIcon size={16}/> Phone Number</span></label>
                        <input 
                            type="text" 
                            className="input input-bordered" 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </div>
                    

                    <div className="card-actions justify-end mt-6">
                        <button 
                            className="btn btn-ghost" 
                            onClick={() => setIsBookingModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-success text-white" 
                            onClick={handleBookingSubmit}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
export default RestaurantDetailPage;