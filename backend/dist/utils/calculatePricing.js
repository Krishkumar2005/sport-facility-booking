"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePricing = void 0;
const prisma_1 = require("../lib/prisma");
const calculatePricing = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { courtId, start, end, coachId, equipments } = params;
    const court = yield prisma_1.prisma.court.findUnique({ where: { id: courtId } });
    if (!court)
        throw new Error("Court not found");
    let price = court.price;
    const rules = yield prisma_1.prisma.pricingRule.findMany({ where: { active: true } });
    const startHour = start.getHours();
    const endHour = end.getHours();
    for (const rule of rules) {
        if (rule.ruleType === "weekend" && (start.getDay() === 0 || start.getDay() === 6))
            price *= rule.multiplier;
        if (rule.ruleType === "peak" && rule.startHour && rule.endHour && startHour >= rule.startHour && endHour <= rule.endHour)
            price *= rule.multiplier;
        if (rule.ruleType === "indoorPremium" && court.type === "indoor")
            price *= rule.multiplier;
    }
    if (coachId)
        price += 200;
    if (equipments && equipments.length > 0) {
        for (const eq of equipments) {
            const equipment = yield prisma_1.prisma.equipment.findUnique({ where: { id: eq.id } });
            if (!equipment)
                throw new Error(`Equipment id ${eq.id} not found`);
            price += 50 * eq.quantity;
        }
    }
    return price;
});
exports.calculatePricing = calculatePricing;
