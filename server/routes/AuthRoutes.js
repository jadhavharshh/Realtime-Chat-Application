import { Router } from 'express';
import { getUserInfo, login, signUp , updateProfile , addProfileImage, removeProfileImage} from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import multer from 'multer';


const authRoutes = Router();
const upload = multer({ dest: 'uploads/profiles' });

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
// Defined in AuthController.js
authRoutes.get('/user-info', verifyToken, getUserInfo)
authRoutes.post('/update-profile', verifyToken, updateProfile)
authRoutes.post('add-profile-image', verifyToken, upload.single("profile-image"), addProfileImage)
authRoutes.delete('remove-profile-image', verifyToken, removeProfileImage)
export default authRoutes;