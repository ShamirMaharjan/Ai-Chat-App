import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    //generate token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    //cookie ma token set gareko
    //sending it to user in cookie
    res.cookie("jwt", token, {
        mageAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}