import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name:"", email: "", password: "" });

  const submit = async () => {
    await registerUser(form);
    alert("Registered");
    window.location.href = "/login";
  };

  return (
     <>
            <form onSubmit={submit} className="shadow-xl p-8 sm:pl-16 md:pl-14 pt-18 m-6 rounded-2xl flex flex-col items-start sm:w-sm w-80">
                <h1 className="self-center text-2xl mb-10 font-extrabold md:text-3xl">SignUp</h1>
                <label htmlFor="name" className="pb-4 md:text-xl font-bold font-serif">Name</label>
                <input className="border rounded outline-0 mb-4 sm:w-70 w-64 p-1" id="name" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        
                <label htmlFor="email" className="pb-4 md:text-xl font-bold font-serif">Email</label>
                <input className="border rounded outline-0 mb-4 sm:w-70 w-64 p-1" id="email" type="text" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                <label htmlFor="password" className="pb-4 md:text-xl font-bold font-serif">Password</label>
                <input className="border rounded outline-0 mb-4 sm:w-70 w-64 p-1" id="password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                <button className="font-serif bg-blue-600 text-white p-2.5 px-8 rounded-xl mt-8 mb-8 self-center cursor-pointer" type="submit">SignUp</button>
                <p className="self-center font-bold text-center">If you are already register then <Link to={"/login"} className="text-blue-600">LogIn</Link></p>

            </form>

            
        </>
  );
}
