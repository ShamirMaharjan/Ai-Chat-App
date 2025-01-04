import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from 'cloudinary';


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } });

        res.json(filteredUser);

    } catch (error) {
        console.log("getUserForSidebar error", error);
        res.status(500).json({ message: "Something went wrong" });

    }

}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageurl;

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl,
        })

        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("sendMessage error", error);
        res.status(500).json({ message: "Something went wrong" });

    }

}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        console.log("getMessage error", error);
        res.status(500).json({ message: "Something went wrong" });

    }

}