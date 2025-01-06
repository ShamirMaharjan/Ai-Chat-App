import express from 'express';
import { getMessage, sendMessage, getUserForSidebar } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);

router.post("/:id", protectRoute, sendMessage);

router.get("/send/:id", protectRoute, getMessage);

export default router;