import React, { useState } from "react";
import API from "../api/api";
import '../App.css';

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess} : LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  

    try {

      const res = await API.post("/login", {email,password});
      console.log("Server response:", {email, password });

      console.log(res.data);

      setMessage(res.data.message);
      onLoginSuccess();

      if(res.data.message === "Login successful") {
        console.log("Login success, going to Signup");
        onLoginSuccess();
      }

    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.detail || "Login failed");
      } else { 
        setMessage("Login successful");
    }
  }
  };
      
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}> className="login-form"

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <button type="submit">Login</button>

      </form>

      {message && <p className="login-message">{message}</p>}

    </div>
  );
}

