import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="container">
      <h1>🏋️ Fitness Tracker</h1>

      <div className="card">
        <Register />
      </div>

      <div className="card">
        <Login />
      </div>

      <div className="card">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;