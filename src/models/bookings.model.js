import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    status:{type:String,default:"approved"},
    numTickets: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
