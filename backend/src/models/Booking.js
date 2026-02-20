import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RestaurantSection",
            required: true,
        },
        bookedBy: { type: String, required: true },
        phoneNo: { type: String, required: true },
        bookingDate: { type: Date, required: true }, // This stores the specific date
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;