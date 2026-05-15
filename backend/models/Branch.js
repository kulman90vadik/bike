import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

BranchSchema.index({ location: "2dsphere" });

export default mongoose.model("Branch", BranchSchema);