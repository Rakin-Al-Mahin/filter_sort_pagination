const User = require("./user.model");

// Service to update user role
const updateUserRoleService = async (id, role) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    throw new Error("User not found");
  }
  return { message: "User role updated successfully", user };
};

module.exports = { updateUserRoleService };
