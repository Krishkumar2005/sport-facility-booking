import { Request, Response } from "express";
import { calculatePricing } from "../utils/calculatePricing";

export const getPricingPreview = async (req: Request, res: Response) => {
  try {
    const { courtId, startTime, endTime, coachId, equipments } = req.body;

    const price = await calculatePricing({ courtId, start: new Date(startTime), end: new Date(endTime), coachId, equipments });

    res.json({ price });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
