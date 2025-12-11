import { useEffect, useState } from "react";
import { getCourts } from "../api/court";
import { getCoaches, getEquipment } from "../api/misc";
import { getLivePrice } from "../api/pricing";
import { createBooking } from "../api/booking";

export default function BookCourt() {
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [equipSelected, setEquipSelected] = useState<any[]>([]);

  const [data, setData] = useState({
    courtId: "",
    coachId: "",
    startTime: "",
    endTime: "",
  });

  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    getCourts().then(r => setCourts(r.data));
    getCoaches().then(r => setCoaches(r.data));
    getEquipment().then(r => setEquipment(r.data));
  }, []);

  // Whenever something changes → live pricing
  useEffect(() => {
    if (!data.courtId || !data.startTime || !data.endTime) return;

    getLivePrice({
      ...data,
      equipment: equipSelected.map(e => ({
        equipmentId: e.id,
        quantity: e.quantity
      }))
    }).then(r => setPrice(r.data.price));

  }, [data, equipSelected]);

  const toggleEquipment = (item: any) => {
    const exists = equipSelected.find(e => e.id === item.id);
    if (exists) {
      setEquipSelected(equipSelected.filter(e => e.id !== item.id));
    } else {
      setEquipSelected([...equipSelected, { id: item.id, quantity: 1 }]);
    }
  };

  const updateQty = (id: number, q: number) => {
    setEquipSelected(
      equipSelected.map(e => e.id === id ? { ...e, quantity: q } : e)
    );
  };

  const submit = async () => {
    await createBooking({
      ...data,
      pricing: price,
      equipment: equipSelected.map(e => ({
        equipmentId: e.id,
        quantity: e.quantity
      }))
    });
    alert("Booking confirmed!");
  };

  return (
    <div>
      <h1>Book Court</h1>

      {/* Court */}
      <select onChange={e => setData({ ...data, courtId: e.target.value })}>
        <option>Select Court</option>
        {courts.map((c: any) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Coach */}
      <select onChange={e => setData({ ...data, coachId: e.target.value })}>
        <option value="">No Coach</option>
        {coaches.map((c: any) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Date Time */}
      <input
        type="datetime-local"
        onChange={e => setData({ ...data, startTime: e.target.value })}
      />
      <input
        type="datetime-local"
        onChange={e => setData({ ...data, endTime: e.target.value })}
      />

      {/* Equipments */}
      <h3>Select Equipment</h3>
      {equipment.map((e: any) => {
        const selected = equipSelected.find(x => x.id === e.id);
        return (
          <div key={e.id}>
            <label>
              <input
                type="checkbox"
                checked={!!selected}
                onChange={() => toggleEquipment(e)}
              />
              {e.name} (Total: {e.total})
            </label>

            {selected && (
              <input
                type="number"
                min={1}
                max={e.total}
                value={selected.quantity}
                onChange={ev =>
                  updateQty(e.id, Number(ev.target.value))
                }
              />
            )}
          </div>
        );
      })}

      {/* Pricing */}
      {price && <h2>Total Price: ₹{price}</h2>}

      {/* Confirm */}
      <button onClick={submit}>Confirm Booking</button>
    </div>
  );
}
