import bcrypt from "bcryptjs";
import Student from "../models/student.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerStudent = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(401).json({ msg: "Fill in all fields" })
    }
    else if (password.length < 6) {
        return res.status(400).json({ msg: "your password is too short" });
    }
    try {
        let student = await Student.findOne({ email });

        if (student) {
            return res.status(400).json({ msg: 'Student already exists' })
        };
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        student = new Student({
            name: username,
            email: email,
            password: hashed
        })
        await admin.save();
        return res.status(201).json({ msg: "Student registered!" })
    }
    catch (err) {
        console.log("Error: ", err)
        return res.status(501).json({ err: err });
    }
}
export const LoginStudent = async (req, res) => {


    try {
        const { email, password } = req.body;
        console.log(password)
        if (!email || !password) {
            return res.status(400).json({ msg: "you need to fill in all fields!" });
        }
        let student = await Student.findOne({ email });
        console.log(admin);
        if (!student) {
            return res.status(400).json({ err: "Check your inputs" });
        }

        const isMatch = await bcrypt.compare(password, student.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid username or password!' });
        };

        const token = generateToken(student._id);
        const { password: _, ...studentData } = student._doc;
        res.status(201).json({ msg: 'Login successful', studentData, token});
    }
    catch (err) {
        return res.status(500).json({ msg: "internal server error", dev: err.message });
    }
}