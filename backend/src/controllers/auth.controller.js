import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import redisClient from "../lib/redis.js";
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        //as user email must be unique so if there is already a user with the same email then we will return a message that user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);

            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("signup error", error);
        return res.status(500).json({ message: error.message });

    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCoorect = await bcrypt.compare(password, user.password);

        if (!isPasswordCoorect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user._id, res);

        // Store token in Redis with a TTL (e.g., 1 day)
        //await redisClient.setEx(user._id.toString(), 86400, token);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("login error", error);
        return res.status(500).json({ message: error.message });

    }

}

export const logout = async (req, res) => {
    //const userId = req.user._id;
    try {

        // Remove token from Redis
        //await redisClient.del(userId.toString());

        res.cookie("jwt", "");
        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("logout error", error);
        return res.status(500).json({ message: error.message });

    }

}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;
    try {

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadedResponse = cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadedResponse.secure_url }, { new: true });

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
        });


    } catch (error) {
        console.log("updateProfile error", error);
        return res.status(500).json({ message: error.message });

    }

}

export const checkAuth = async (req, res) => {

    try {
        if (!req.user) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        res.status(200).json(req.user)

    } catch (error) {
        console.log("checkAuth error", error);
        return res.status(500).json({ message: error.message });

    }

};