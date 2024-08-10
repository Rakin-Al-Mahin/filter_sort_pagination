import { Request, Response } from "express";
import { updateUserRoleService } from "./user.service.js";

// Update user role
const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Ensure role is of type "user" or "admin"
    if (role !== "user" && role !== "admin") {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    const result = await updateUserRoleService(id, role);
    res.status(200).json(result);
  } catch (error: any) {
    // Use 'any' type for error to handle cases where the error type is unknown
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export { updateUserRole };
