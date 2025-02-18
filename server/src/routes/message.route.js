import express from 'express';
import { getUserForSidebar } from '../controller/message.controller';


const router = express.Router();

router.post("/user",getUserForSidebar)


export default router;