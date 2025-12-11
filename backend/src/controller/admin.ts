import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const createCourt = async (req: Request, res: Response) => {
  const { name, type, price } = req.body;
  const court = await prisma.court.create({ data: { name, type, price } });
  res.json(court);
};

export const createCoach = async (req: Request, res: Response) => {
  const { name } = req.body;
  const coach = await prisma.coach.create({ data: { name } });
  res.json(coach);
};

export const createEquipment = async (req: Request, res: Response) => {
  const { name, total } = req.body;
  const equipment = await prisma.equipment.create({ data: { name, total } });
  res.json(equipment);
};

export const createPricingRule = async (req: Request, res: Response) => {
  const { name, ruleType, startHour, endHour, multiplier } = req.body;
  const rule = await prisma.pricingRule.create({ data: { name, ruleType, startHour, endHour, multiplier } });
  res.json(rule);
};
