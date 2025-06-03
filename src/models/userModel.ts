import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
}, {
  timestamps: true // ✅ Adds createdAt and updatedAt fields
});

// ✅ Prevents model overwrite issues in Next.js
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;