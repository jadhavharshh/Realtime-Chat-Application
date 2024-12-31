import Router from 'express';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import { CreateChannel, getChannelMessages, getUserChannels } from '../controllers/ChannelController.js';

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, CreateChannel);
channelRoutes.get("/get-user-channels", verifyToken, getUserChannels);
channelRoutes.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages);
export default channelRoutes;