import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById
} from '../controllers/events.controller';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { upload, uploadSingleToCloudinary } from '../middlewares/imageUploads';

const router = express.Router();

// import { isLoggedIn } from '../middlewares/isLoggedIn';
router.post('/',
isLoggedIn
/* #swagger.security = [{
            "bearerAuth": []
    }] */,upload.single('image'),(req,res,next) =>{
        uploadSingleToCloudinary(req,res,next,'events')
    },
createEvent);
router.get('/',isLoggedIn,
/* #swagger.security = [{
    "bearerAuth": []
}] */ getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEventById);
router.delete('/:id', deleteEventById);

export default router;
