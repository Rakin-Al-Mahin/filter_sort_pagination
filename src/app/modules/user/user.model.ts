import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface representing a user document in MongoDB
export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string; // Password is optional since it may not be required
  role: "user" | "admin";
  googleId?: string;
  facebookId?: string;
}

// Create a Schema corresponding to the document interface
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function (this: UserDocument) {
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
// userSchema.methods.setSocialMediaId = function (platform: string, id: string) {
//   if (platform === "google") {
//     this.googleId = id;
//   } else if (platform === "facebook") {
//     this.facebookId = id;
//   }
// };

// Create a Model
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export default User;
