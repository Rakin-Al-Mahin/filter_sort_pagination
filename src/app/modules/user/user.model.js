const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  password: { type: String},
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// // Custom validation for the password field
// userSchema.pre("save", function (next) {
//   if (!this.googleId && !this.password) {
//     return next(new Error("Password is required"));
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
