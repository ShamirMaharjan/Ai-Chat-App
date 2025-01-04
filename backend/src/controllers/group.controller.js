import Group from "../models/group.model.js";
import mongoose from "mongoose";
export const createGroup = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: "Group name is required" });
        }
        const userId = req.user._id;

        const newGroup = await new Group({
            name,
            users: [userId],
        });

        if (newGroup) {
            await newGroup.save();
            res.status(200).json(newGroup);
        }

    } catch (error) {
        console.log("createGroup error", error);
        return res.status(400).json({ message: "Group name already exists" });

        //res.status(500).json({ message: "Something went wrong" });

    }

}

export const getGroupsForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredGroup = await Group.find({ users: loggedInUser });

        res.json(filteredGroup);

    } catch (error) {
        console.log("getGroupsForSidebar error", error);
        res.status(500).json({ message: "Something went wrong" });

    }
}

export const addUserToGroup = async (req, res) => {
    const { users } = req.body
    try {
        const { groupId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ message: "Invalid group ID" });
        }

        const userId = req.user._id;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (!Array.isArray(users)) {
            return res.status(400).json({ message: "Users must be an array" });
        }
        if (!group.users.includes(userId)) {
            return res.status(400).json({ message: "you are not in group" });
        }

        // Update group with new users
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { users: { $each: users } } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        if (updatedGroup) {
            res.status(200).json(updatedGroup);
        }

    } catch (error) {
        console.log("addUserToGroup error", error);
        res.status(500).json({ message: "Something went wrong" });

    }
}