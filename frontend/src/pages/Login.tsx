import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    console.log("Form", form);
    const res = await loginUser(form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="email" onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input placeholder="password" type="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}
