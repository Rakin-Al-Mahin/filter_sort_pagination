import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../modules/user/user.model";
import dotenv from "dotenv";

dotenv.config();
const JWT_TOKEN = process.env.JWT_SECRET as string;

// Middleware to authenticate and check roles
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user; // Now TypeScript recognizes req.user
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

const socialAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized access. Please log in." });
};

export { authenticate, authorizeAdmin, socialAuthenticated };
