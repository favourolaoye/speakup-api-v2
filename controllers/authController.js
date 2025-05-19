import bcrypt from "bcryptjs";
import Admin from "../models/authModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(401).json({ msg: "Fill in all fields" })
    }
    else if (password.length < 6) {
        return res.status(400).json({ msg: "your password is too short" });
    }
    try {
        let admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' })
        };
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        admin = new Admin({
            name: username,
            email: email,
            password: hashed
        })
        await admin.save();
        return res.status(201).json({ msg: "Admin registered!" })
    }
    catch (err) {
        console.log("Error: ", err)
        return res.status(501).json({ err: err });
    }
}
export const LoginAdmin = async (req, res) => {


    try {
        const { email, password } = req.body;
        console.log(password)
        if (!email || !password) {
            return res.status(400).json({ msg: "you need to fill in all fields!" });
        }
        let admin = await Admin.findOne({ email });
        console.log(admin);
        if (!admin) {
            return res.status(400).json({ msg: "Invalid username or password!" });
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid username or password!' });
        };

        const token = generateToken(admin._id);
        const { password: _, ...adminData } = admin._doc;
        res.status(201).json({ msg: 'Login successful', adminData, token});
    }
    catch (err) {
        return res.status(500).json({ msg: "internal server error", dev: err.message });
    }
}