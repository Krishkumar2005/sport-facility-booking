import { useEffect, useState } from "react";
import { getCourts } from "../api/court";

export default function Home() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    getCourts().then(res => setCourts(res.data));
  }, []);

  return (
    <div>
      <h1>Courts</h1>
      {courts.map((c:any)=>(
        <div key={c.id}>
          {c.name} - {c.type} - ₹{c.price}
        </div>
      ))}
    </div>
  );
}
