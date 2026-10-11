import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(503).json({
        message: "Authentication is not configured on the server.",
      });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({
        message: "User account not found.",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};