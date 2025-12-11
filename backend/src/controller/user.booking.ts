import { Request, Response } from "express";
import { calculatePricing } from "../utils/calculatePricing";
import { prisma } from "../lib/prisma";


export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, courtId, startTime, endTime, coachId, equipments } = req.body;

    // Check court availability
    const existingCourt = await prisma.booking.findFirst({
      where: { courtId, AND: [{ startTime: { lt: new Date(endTime) } }, { endTime: { gt: new Date(startTime) } }], status: "confirmed" },
    });
    if (existingCourt) return res.status(400).json({ error: "Court not available" });

    // Check coach availability
    if (coachId) {
      const existingCoach = await prisma.booking.findFirst({
        where: { coachId, AND: [{ startTime: { lt: new Date(endTime) } }, { endTime: { gt: new Date(startTime) } }], status: "confirmed" },
      });
      if (existingCoach) return res.status(400).json({ error: "Coach not available" });
    }

    const price = await calculatePricing({ courtId, start: new Date(startTime), end: new Date(endTime), coachId, equipments });

    const booking = await prisma.booking.create({
      data: {
        userId,
        courtId,
        coachId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        pricing: price,
        equipments: { create: equipments?.map((eq: any) => ({ equipmentId: eq.id, quantity: eq.quantity })) || [] },
      },
    });

    res.json({ booking });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
