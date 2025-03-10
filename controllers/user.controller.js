import User from "../models/user.js";
import bcrypt from "bcryptjs"
import generateTokenandSetCookie from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ error: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            name,
            email,
            password: hashedpassword
        })

        if (newuser) {
            await generateTokenandSetCookie(newuser._id, res)
            await newuser.save()
            res.status(201).json({ _id: newuser._id, message: "User created successfully" })
        }
        else {
            res.status(400).json({ error: "Invalid user data" })
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server errror" })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token and set cookie
        const token = await generateTokenandSetCookie(existingUser._id, res);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
            },
            token: token,
            headers: res.getHeaders(),
            cookies: req.cookies, // Returns all cookies
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });  
        res.clearCookie('token', { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'none', 
            path: '/api' // Try clearing specific paths if needed
        });      
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("error in logout controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getme = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    }
    catch {
        console.error("error in getme controller")
        res.status(500).json({ error: "internal server error" })
    }
}