import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantsNotFound from '../components/RestaurantsNotFound'
const HomePage = () => {
    const [isRateLimited, setIsRateLimited]= useState(false);
    const [restaurants,setRestaurants] = useState([]);
    const [loading,setLoading] = useState(true);
  
    useEffect(()=>{
        const fetchRestaurants = async ()=> {
            try {
                const res = await api.get("/restaurants");
                console.log(res.data);
                setRestaurants(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching restaurants");
                if(error.response?.status === 429){
                    setIsRateLimited(true) 
                }else{
                    toast.error("Failed to load restaurants")
                }
            }finally{
                setLoading(false);
            }
        };
        fetchRestaurants();
    },[]);
  
  return <div className='min-h-screen'>
        <Navbar/>
        {isRateLimited && <RateLimitedUI/>} 
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10'>Loading restaurants...</div>}
            {restaurants.length ===0 && !isRateLimited && <RestaurantsNotFound/>}
            {restaurants.length >0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                        setRestaurants={setRestaurants}
                    />
                    ))}
                </div> 
            )}
        </div>
  </div>
  
}

export default HomePage