import api from "./lib/axios";

export const GetRestaurantDetails = () => {
    console.log("")
  return api.get(`/restaurants`);
};

export const GetAllBookings = () => {
  return api.get(`/restaurants/bookings/all`);
};