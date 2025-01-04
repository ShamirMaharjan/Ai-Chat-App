import mongoose from "mongoose";
import User from "./user.model.js";

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Group name already exists"],

    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
});

const groupModel = mongoose.model("Group", groupSchema);
export default groupModel;