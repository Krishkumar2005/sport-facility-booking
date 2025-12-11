import { prisma } from "../lib/prisma";

interface EquipmentSelection {
  id: number;
  quantity: number;
}

interface PricingParams {
  courtId: number;
  start: Date;
  end: Date;
  coachId?: number;
  equipments?: EquipmentSelection[];
}

export const calculatePricing = async (params: PricingParams) => {
  const { courtId, start, end, coachId, equipments } = params;
  const court = await prisma.court.findUnique({ where: { id: courtId } });
  if (!court) throw new Error("Court not found");

  let price = court.price;
  const rules = await prisma.pricingRule.findMany({ where: { active: true } });
  const startHour = start.getHours();
  const endHour = end.getHours();

  for (const rule of rules) {
    if (rule.ruleType === "weekend" && (start.getDay() === 0 || start.getDay() === 6)) price *= rule.multiplier;
    if (rule.ruleType === "peak" && rule.startHour && rule.endHour && startHour >= rule.startHour && endHour <= rule.endHour) price *= rule.multiplier;
    if (rule.ruleType === "indoorPremium" && court.type === "indoor") price *= rule.multiplier;
  }

  if (coachId) price += 200;

  if (equipments && equipments.length > 0) {
    for (const eq of equipments) {
      const equipment = await prisma.equipment.findUnique({ where: { id: eq.id } });
      if (!equipment) throw new Error(`Equipment id ${eq.id} not found`);
      price += 50 * eq.quantity;
    }
  }

  return price;
};
