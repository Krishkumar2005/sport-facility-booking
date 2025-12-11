import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ name:"", email: "", password: "" });

  const submit = async () => {
    await registerUser(form);
    alert("Registered");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="name" onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <input placeholder="email" onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input placeholder="password" type="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}
