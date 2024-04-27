// models/Event.js
import { required } from 'joi';
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    profileImg:{type:String,required:true},
    ticketAvailability: { type: Number, default: 0 },
    bookedTickets: { type: Number, default: 0 },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
