import express from 'express';
const router = express.Router();
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/updateProfile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);


export default router;