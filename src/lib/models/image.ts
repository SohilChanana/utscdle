import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Image schema
const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dailyEligible: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  usedOnDate: {
    type: Date,
    default: null,
  },
});

// Create the Image model
const Image = mongoose.models?.Image || model("Image", imageSchema);
export default Image;
