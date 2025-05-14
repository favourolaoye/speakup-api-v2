import jwt from "jsonwebtoken";
import Admin from "../models/authModel.js";

export const protect = async (req, res, next) => {
  let token = req.body.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Not authorized, token failed' });
  }
};


