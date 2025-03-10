import jwt from "jsonwebtoken";
import User from "../../models/user.js";

const generateTokenandSetCookie = async (userId, res) => {
    const user = await User.findOne({ _id: userId }).lean();
    
    if (!user) {
        throw new Error("User not found"); // Handle case where user is null
    }

    const token = jwt.sign({ userId, name: user.name }, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
};

export default generateTokenandSetCookie;
