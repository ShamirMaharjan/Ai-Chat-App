import { Router } from "express";
import { getAI } from "../controllers/ai.controller.js";

const router = Router();

router.get("/get-ai", getAI);

export default router