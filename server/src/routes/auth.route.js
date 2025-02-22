import express from 'express';
import {logout, signup, login, updateProfile} from '../controller/auth.controller.js'
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/update-profile',authenticate,updateProfile);




export default router; // Export the router for use in `app.js`