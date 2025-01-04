import express from "express";
import { createGroup, getGroupsForSidebar, addUserToGroup } from "../controllers/group.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);

router.get("/get-groups", protectRoute, getGroupsForSidebar);

router.put("/add-users/:groupId", protectRoute, addUserToGroup);
export default router;
