import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        // minlength: [2, "Username should have at least 2 character"],
        // maxlength: [15, "Username should not exceed 15 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        // match: [
        //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        //   "Please provide a valid email address",
        // ],
      },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        // minlength: [5, "Please provide a strong password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;