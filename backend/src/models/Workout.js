const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true, trim: true }, // running, gym, yoga
    duration: { type: Number, required: true }, // in minutes
    calories: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

