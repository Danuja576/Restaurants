import Restaurant from "../models/Restaurant.js"
import RestaurantSection from "../models/RestaurantSection.js";
import Booking from "../models/Booking.js";

export async function getAllRestaurants(_,res){
    try{
        const restaurants = await Restaurant.find().sort({createdAt: -1});// -1 will sort in decending order
        res.status(200).json(restaurants)
    }catch(error){
        console.error("Error in getAllRestaurants controllers",error);
        res.status(500).json({message:"Internal server error"}); 
    }
}
export async function getRestaurantById(req,res) {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant) return res.status(404).json({message:"Restaurant not found!"});
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error in getRestaurantById controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}
export async function createARestaurant(req,res){
    try {
        const{name,content} = req.body
        const restaurant = new Restaurant({ name,content})
        
        const savedRestaurant= await restaurant.save();
        res.status(201).json(savedRestaurant)
        
    } catch (error) {
        console.error("Error in createRestaurants controllers",error);
        res.status(500).json({message:"Internal server error"}); 
    }
}
export async function getRestaurantSections(req, res) {
    try {
        const sections = await RestaurantSection.find({ restaurantId: req.params.id });
        res.status(200).json(sections);
    } catch (error) {
        console.error("Error in getRestaurantSections", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createARestaurantSection(req, res) {
    try {
        const { name, count, restaurantId } = req.body; 
        
        const restaurantSection = new RestaurantSection({
            name,
            count,
            restaurantId,
            isBooked: false
        });

        const savedRestaurantSection = await restaurantSection.save();
        res.status(201).json(savedRestaurantSection);
    } catch (error) {
        console.error("Error in createARestaurantSection", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateRestaurant(req, res){
    try{
        const{name,content} = req.body
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id,{name,content},{
            new:true,
        });
        if(!updatedRestaurant) return res.status(404).json({message:"Restaurant not found"});
        
        res.status(200).json(updateRestaurant);
    }catch(error){
        
        console.error("Error in updatedRestaurants controllers",error);
        res.status(500).json({message:"Internal server error"}); 
    }
}

export async function deleteRestaurant(req, res){
    try {
        const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
        
        if(!deleteRestaurant) return res.status(404).json({message:"Restaurant not found"});
        res.status(200).json({message:"Restaurant deleted successfully!"})
    } catch (error) {
        
        console.error("Error in deleteRestaurants controllers",error);
        res.status(500).json({message:"Internal server error"}); 
    }
}
export async function BookSections(req, res) {
    try {
        const { sectionIds, bookedBy, phoneNo, bookingDate, restaurantId } = req.body;

        if (!sectionIds || sectionIds.length === 0) {
            return res.status(400).json({ message: "No sections selected" });
        }

        // Create a new booking document for every section selected
        const bookingPromises = sectionIds.map(id => {
            return new Booking({
                restaurantId,
                sectionId: id,
                bookedBy,
                phoneNo,
                bookingDate
            }).save();
        });

        await Promise.all(bookingPromises);

        res.status(201).json({ message: "Bookings created successfully" });
    } catch (error) {
        console.error("Error in BookSections", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function getAllBookings(req, res) {
    try {
        const bookings = await Booking.find()
            .populate("restaurantId", "name") 
            .populate("sectionId", "name") // Get the section name too
            .sort({ bookingDate: 1 }); // Sort by upcoming dates
            
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error in getAllBookings", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function getRestaurantBookings(req, res) {
    try {
        const bookings = await Booking.find({ restaurantId: req.params.id });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error in getRestaurantBookings", error);
        res.status(500).json({ message: "Internal server error" });
    }
}