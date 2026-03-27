import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const token = localStorage.getItem("token");

  const addWorkout = async () => {
    await axios.post(
      "http://localhost:5000/api/workouts",
      { type, duration },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    getWorkouts();
  };

  const getWorkouts = async () => {
    const res = await axios.get("http://localhost:5000/api/workouts", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWorkouts(res.data);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Workout Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={addWorkout}>Add Workout</button>

      <h3>Your Workouts</h3>
      {workouts.map((w) => (
        <div className="workout" key={w._id}>
          <strong>{w.type}</strong> - {w.duration} mins
        </div>
      ))}
    </div>
  );
}

export default Dashboard;