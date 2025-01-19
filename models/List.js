const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    name: {
      type: String,
      required: [true, "List name is required"],
      trim: true,
    },
    responseCodes: [
      {
        code: {
          type: String,
          required: [true, "Response code is required"],
        },
        imageUrl: {
          type: String,
          required: [true, "Image URL is required"],
        },
      },
    ],
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

listSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const listModal = new mongoose.model("List", listSchema);

module.exports = { listModal };
