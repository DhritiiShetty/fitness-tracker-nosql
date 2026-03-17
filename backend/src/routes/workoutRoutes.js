const express = require("express");

const auth = require("../middleware/authMiddleware");
const Workout = require("../models/Workout");

const router = express.Router();

// POST / -> add workout (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { type, duration, calories, date } = req.body || {};

    if (!type || duration === undefined) {
      return res.status(400).json({ message: "type and duration are required" });
    }

    const workout = await Workout.create({
      user: req.user.id,
      type,
      duration,
      calories,
      date,
    });

    return res.status(201).json(workout);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// GET / -> get all workouts of logged-in user (protected)
router.get("/", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    return res.json(workouts);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// PUT /:id -> update a workout (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};

    // Never allow changing ownership
    delete updates.user;

    const workout = await Workout.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!workout) return res.status(404).json({ message: "Workout not found" });
    return res.json(workout);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// DELETE /:id -> delete a workout (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndDelete({ _id: id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    return res.json({ message: "Workout deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
    try {
      const workout = await Workout.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      );
  
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      res.json({ message: "Workout updated", workout });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  // DELETE workout
router.delete("/:id", auth, async (req, res) => {
    try {
      const workout = await Workout.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });
  
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      res.json({ message: "Workout deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;

