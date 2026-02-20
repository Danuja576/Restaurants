import mongoose from "mongoose";

const restaurantSectionSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        isBooked:{
            type: Boolean,
            default: false,
        },
        bookedBy: {
            type: String,
            default: "",
        },
        phoneNo: {
            type: String,
            default: "",
        },
        bookingDate: {
            type: Date,
            default: null,
        },

    },
    {timestamps: true}
);

const RestaurantSection = mongoose.model("RestaurantSection",restaurantSectionSchema);

export default RestaurantSection;