import mongoose from "mongoose";

const message = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,

    },
    image: {
        type: String
    }
},
    { timestamp: true }
);

const messageModel = mongoose.model("Message", message);
export default messageModel;