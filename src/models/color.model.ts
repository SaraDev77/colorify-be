import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    quote: { type: String },
  },
  { timestamps: true }
);

export const Color = mongoose.model("color", colorSchema);
