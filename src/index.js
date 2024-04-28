import express from 'express';
import mongoose from 'mongoose';
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
import allRoutes from './routes';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger-output.json'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by');
app.use(passport.initialize());
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.use('/api/v1',allRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.get('/hello',(req,res)=>{
    res.send('Hello world')
})
export default app;