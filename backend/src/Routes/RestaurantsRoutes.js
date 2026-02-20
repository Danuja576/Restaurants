import express from "express";
import { createARestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant,createARestaurantSection, getRestaurantSections, BookSections,getAllBookings ,getRestaurantBookings} from "../controllers/RestaurantsController.js";

const router = express.Router();
router.get("/",getAllRestaurants);
router.get("/:id",getRestaurantById);
router.post("/",createARestaurant);
router.put("/:id",updateRestaurant);
router.delete("/:id",deleteRestaurant);

router.get("/:id/sections", getRestaurantSections);
router.post("/sections", createARestaurantSection);
router.put("/sections/book", BookSections);
router.get("/bookings/all", getAllBookings);
router.get("/:id/bookings", getRestaurantBookings);
export default router;  

