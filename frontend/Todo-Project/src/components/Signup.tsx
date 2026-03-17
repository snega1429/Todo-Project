
import { useState } from "react";
import API from "../api/api";

type Props = {
  onSignupSuccess: () => void;
};

export default function Signup({ onSignupSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/signup", { email, password });
      console.log(res.data);

      setMessage(res.data.message);

      console.log("Signup success going to Todo Paage");
      onSignupSuccess();

      if(
        res.data.message === "Signup successful" ||
        res.data.message === "User already exists"
      ) {

        console.log("Signup success => going to Todo page")
        onSignupSuccess();

      }

      
    } catch (error: any) {
      if(error.response) {
        setMessage(error.response.data.detail || "Signup failed");

      if (error.response.data.detail === "User already exists") {
        onSignupSuccess();
      }
    
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
    <form onSubmit={handleSignup}>
      
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
      <br />
      <button type="submit">Signup</button>
    </form>
      {message && <p> {message}</p>}
    </div>
    
  );
}