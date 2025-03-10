import jwt from "jsonwebtoken";
const generateTokenandSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS
        sameSite: 'none', // Required for cross-origin
        domain: 'render-deployment-cmrp.onrender.com', // Your backend domain
        path: '/',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return token;
};

export default generateTokenandSetCookie;
