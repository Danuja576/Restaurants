import api from "./lib/axios";

export const GetRestaurantDetails = () => {
    console.log("")
  return api.get(`/restaurants`);
};

export const GetAllBookings = () => {
  return api.get(`/restaurants/bookings/all`);
};


export const PostRestaurant = (restaurantData) => {
  return api.post('/restaurants', restaurantData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const DeleteRestaurant=(id)=>{
    api.delete(`/restaurants/${id}`);
};

export const PutRestaurant = (id,restaurant) => {
  api.put(`/restaurants/${id}`, restaurant);
};