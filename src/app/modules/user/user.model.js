const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      // Password is required only if Google or Facebook ID is not present
      return !this.googleId && !this.facebookId;
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  googleId: { type: String },
  facebookId: { type: String },
});

// Optional: Add a custom method to handle setting user details
// userSchema.methods.setSocialMediaId = function (platform, id) {
//   if (platform === "google") {
//     this.googleId = id;
//   } else if (platform === "facebook") {
//     this.facebookId = id;
//   }
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
