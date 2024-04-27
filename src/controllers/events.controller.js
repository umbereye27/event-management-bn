import Event from "../models/events.model";
import { uploadSingleToCloudinary } from "../middlewares/imageUploads";
export const createEvent = async (req, res) => {
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/eventsSchema"
                    }  
                }
            }
        } 
    */
        try {
            const { title, date, location, ticketAvailability } = req.body;
            if (!title || !date || !location || !ticketAvailability) {
                return res.status(400).json({ message: 'Please provide all required fields.' });
            }

            const newEvent = new Event({
                title,
                date,
                location,
                ticketAvailability,
                profileImg: req.body.cloudinaryUrl
            });
            const savedEvent = await newEvent.save();
            res.status(201).json({ message: 'Event created successfully', event: savedEvent });
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
};
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
export const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
export const updateEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error updating event by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
export const deleteEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Error deleting event by ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
