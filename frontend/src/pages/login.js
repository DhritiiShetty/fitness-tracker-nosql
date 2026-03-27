import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;