import mongoose from "mongoose";

// Define schema
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    key: {
      type: String,
      unique: true,
      requried: true,
    },
    lists: [
      {
        title: String,
        content: String,
        isCompleated: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create model
// Bhai 😂 bohu sataya export ne: Ek Models hai aur ek model h dekh k jara :)

export default mongoose.models.User || mongoose.model("User", userSchema);
