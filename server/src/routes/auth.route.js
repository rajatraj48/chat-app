import express from 'express';
import {logout, signup, login} from '../controller/auth.controller.js'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);




export default router; // Export the router for use in `app.js`