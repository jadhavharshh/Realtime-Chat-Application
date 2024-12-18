import { Router } from 'express';
import { getUserInfo, login, signUp } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';


const authRoutes = Router();

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
// Defined in AuthController.js
authRoutes.get('/user-info', verifyToken, getUserInfo)
export default authRoutes;