import { Link } from "react-router-dom";

export default function Navbar() {
    const role = localStorage.getItem("role")
  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/">Home</Link> |  
      <Link to="/book">Book Court</Link> | 
      {role == "admin" &&  
        <Link to="/pricing/admin">Admin Pricing</Link> 
      } 
      |<button onClick={() => { localStorage.clear(); window.location.href="/login" }}>Logout</button>
    </nav>
  );
}
