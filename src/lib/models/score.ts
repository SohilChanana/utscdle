import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the Score schema
const scoreSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  // Attempts is an object with the following structure:
  // {position: {lat: 43.78417163365461, lng: -79.18661765111683}, distance: 251.2680620642451, attempt: 1}
  attempts: {
    type: Array,
    required: true,
  },


});

// Create the Score model
const Score = mongoose.models?.Score || model("Score", scoreSchema);
export default Score;
