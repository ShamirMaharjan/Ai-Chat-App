import mongoose from "mongoose";

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uinque: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }

},
    { timestamp: true }
);
const userModel = mongoose.model("User", user);
export default userModel;