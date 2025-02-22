import express from 'express';
import { getUserForSidebar } from '../controller/message.controller.js';
import authenticate from '../middleware/authenticate.js';


const router = express.Router();

router.post("/user",authenticate,getUserForSidebar)


export default router;