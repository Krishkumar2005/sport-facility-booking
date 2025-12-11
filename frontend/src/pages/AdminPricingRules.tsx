import { useState, useEffect } from "react";
import { createPricingRule, getPricingRules } from "../api/pricing";

export default function AdminPricingRules() {
  const [rule, setRule] = useState({
    name: "",
    ruleType: "",
    multiplier: 1,
    startHour: 0,
    endHour: 0,
  });

  const [rules, setRules] = useState<any[]>([]);

  // Fetch existing rules on mount
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const res = await getPricingRules();
    setRules(res.data);
  };

  const save = async () => {
    await createPricingRule(rule);
    alert("Rule added");
    fetchRules(); // refresh the list
  };

  return (
    <div>
      <h1>Create Pricing Rule</h1>

      <input
        placeholder="Name"
        onChange={e => setRule({ ...rule, name: e.target.value })}
      />
      
      <select onChange={e => setRule({ ...rule, ruleType: e.target.value })}>
        <option value="">Select Type</option>
        <option value="weekend">Weekend</option>
        <option value="peak">Peak Hours</option>
        <option value="indoorPremium">Indoor Premium</option>
      </select>

      <input
        placeholder="Multiplier (ex: 1.2)"
        onChange={e => setRule({ ...rule, multiplier: parseFloat(e.target.value) })}
      />

      <input
        placeholder="Start Hour"
        onChange={e => setRule({ ...rule, startHour: Number(e.target.value) })}
      />
      <input
        placeholder="End Hour"
        onChange={e => setRule({ ...rule, endHour: Number(e.target.value) })}
      />

      <button onClick={save}>Add Rule</button>

      <h2>Existing Pricing Rules</h2>
      <ul>
        {rules.map(r => (
          <li key={r.id}>
            {r.name} - {r.ruleType} - Multiplier: {r.multiplier} 
            {r.startHour != null && ` - ${r.startHour}:00 to ${r.endHour}:00`}
          </li>
        ))}
      </ul>
    </div>
  );
}
