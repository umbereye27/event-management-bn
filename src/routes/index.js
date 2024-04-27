import express from 'express'
import authRoutes from './auth.routes'
import eventRoutes from './events.routes'
import bookinRoutes from './bookings.routes'

const allRoutes = express.Router()
allRoutes.use('/auth',
// #swagger.tags = ['Auth']
authRoutes)
allRoutes.use('/events',
// #swagger.tags = ['Events']
eventRoutes)
allRoutes.use('/booking',
// #swagger.tags = ['Bookings']
bookinRoutes)
export default allRoutes