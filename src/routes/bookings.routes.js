import express from 'express';
import {
    bookTickets,
    cancelBooking,
    getAllBookings
} from '../controllers/bookings.controller';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { checkRoles } from '../middlewares/checkRole';

const bookinRoutes = express.Router();

bookinRoutes.post('/:id',isLoggedIn, checkRoles(['admin']), bookTickets);
bookinRoutes.post('/cancel/:id', cancelBooking);
bookinRoutes.get('/all', isLoggedIn, checkRoles('admin', 'manager', 'user'), getAllBookings);
export default bookinRoutes;
