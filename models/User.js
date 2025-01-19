const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"], // Validation message for required field
      unique: true, // Ensure email uniqueness
      trim: true, // Remove leading/trailing spaces
      lowercase: true, // Save email in lowercase
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address", // Regex for email format
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Validation message for required field
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length
      validate: {
        validator: function (value) {
          // Custom validation for strong password
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          );
        },
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});
const userModal = new mongoose.model("User", userSchema);

module.exports = { userModal };
