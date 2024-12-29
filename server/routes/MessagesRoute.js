import { Router } from 'express';
import { getMessages, uploadFile } from '../models/MessageController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js'
import multer from 'multer';

const MessagesRoute = Router();
const uploads = multer({ dest: 'uploads/files' });
MessagesRoute.post("/get-messages", verifyToken , getMessages);
MessagesRoute.post("/upload-file", verifyToken, uploads.single('file'), uploadFile);

export default MessagesRoute;