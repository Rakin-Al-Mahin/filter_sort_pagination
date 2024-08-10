import User from "./user.model.js";
import { UserDocument } from "./user.model.js";

// Service to update user role
const updateUserRoleService = async (
  id: string,
  role: "user" | "admin"
): Promise<{ message: string; user: UserDocument }> => {
  const user = (await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  )) as UserDocument;
  if (!user) {
    throw new Error("User not found");
  }
  return { message: "User role updated successfully", user };
};

export { updateUserRoleService };
