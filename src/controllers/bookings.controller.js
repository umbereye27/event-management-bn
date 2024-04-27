import Booking from "../models/bookings.model";
import Event from "../models/events.model";
import User from "../models/user.model";

export const bookTickets = async (req, res) => {
    const { id } = req.params;
    const { numTickets, userId } = req.body; 
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        if (numTickets <= 0) {
            return res.status(400).json({ message: 'Number of tickets must be greater than zero.' });
        }
        if (event.ticketAvailability < numTickets) {
            return res.status(400).json({ message: 'Not enough tickets available.' });
        }
        const booking = new Booking({
            event: id,
            user: req.user._id,
            numTickets
        });
        await booking.save();
        event.ticketAvailability -= numTickets;
        event.bookedTickets += numTickets;
        event.bookings.push(booking);
        await event.save();
        res.json({ message: `${numTickets} tickets booked successfully.` });
    } catch (error) {
        console.error('Error booking tickets:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
export const cancelBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }
        const event = await Event.findById(booking.event);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        event.ticketAvailability += booking.numTickets;
        event.bookedTickets -= booking.numTickets;
        await event.save();
        booking.status="canceled";
        await booking.save();
        res.json({ message: 'Booking canceled successfully.' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllBookings = async (req, res) => {
    const userId = req.user._id; 
    const userRole = req.user.role; 
    try {
        let events;
        if (userRole === 'admin') {
            // For admin users, get all events associated with bookings
            const bookings = await Booking.find().populate('event');
            events = bookings.map(booking => booking.event);
        } else if (userRole === 'manager') {
            // For manager users, get events associated with manager's events
            const userEvents = await Event.find({ user: userId });
            const eventIds = userEvents.map(event => event._id);
            events = await Event.find({ _id: { $in: eventIds } });
        } else {
            // For regular users, get events associated with their bookings
            const userBookings = await Booking.find({ user: userId }).populate('event');
            events = userBookings.map(booking => booking.event);
        }

        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
