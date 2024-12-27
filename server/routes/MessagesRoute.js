import { Router } from 'express';
import { getMessages } from '../models/MessageController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js'
  

const MessagesRoute = Router();

MessagesRoute.post("/get-messages", verifyToken , getMessages);


export default MessagesRoute;