import { userLogin,userSignup,updateUserRole, getAllUsers } from "../controllers/auth.controller";
import express from 'express';
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { checkRoles } from "../middlewares/checkRole";

const authRoutes = express.Router()
authRoutes.post('/login',userLogin)
authRoutes.post('/signup',userSignup)
authRoutes.patch('/role-update',isLoggedIn,checkRoles(['admin']),updateUserRole)
authRoutes.get('/getAll',isLoggedIn,checkRoles(['admin']),getAllUsers)
export default authRoutes;