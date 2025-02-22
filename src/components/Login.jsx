import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card} from "./ui/card";
import {Input} from "./ui/input";
import { Button } from "./ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "demouser" && password === "demopass") {
      navigate("/planner");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 space-y-4 w-96">
        <h2 className="text-xl font-bold">Login</h2>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </Card>
    </div>
  );
}
