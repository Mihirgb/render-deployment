import jwt from "jsonwebtoken";
const generateTokenandSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });
    res.cookie("token", token, {
        httpOnly: true,  // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict", // Prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};

export default generateTokenandSetCookie;
