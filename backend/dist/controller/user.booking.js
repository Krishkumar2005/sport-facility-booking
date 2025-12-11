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
exports.createBooking = void 0;
const calculatePricing_1 = require("../utils/calculatePricing");
const prisma_1 = require("../lib/prisma");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courtId, startTime, endTime, coachId, equipments } = req.body;
        // Check court availability
        const existingCourt = yield prisma_1.prisma.booking.findFirst({
            where: { courtId, AND: [{ startTime: { lt: new Date(endTime) } }, { endTime: { gt: new Date(startTime) } }], status: "confirmed" },
        });
        if (existingCourt)
            return res.status(400).json({ error: "Court not available" });
        // Check coach availability
        if (coachId) {
            const existingCoach = yield prisma_1.prisma.booking.findFirst({
                where: { coachId, AND: [{ startTime: { lt: new Date(endTime) } }, { endTime: { gt: new Date(startTime) } }], status: "confirmed" },
            });
            if (existingCoach)
                return res.status(400).json({ error: "Coach not available" });
        }
        const price = yield (0, calculatePricing_1.calculatePricing)({ courtId, start: new Date(startTime), end: new Date(endTime), coachId, equipments });
        const booking = yield prisma_1.prisma.booking.create({
            data: {
                userId,
                courtId,
                coachId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                pricing: price,
                equipments: { create: (equipments === null || equipments === void 0 ? void 0 : equipments.map((eq) => ({ equipmentId: eq.id, quantity: eq.quantity }))) || [] },
            },
        });
        res.json({ booking });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createBooking = createBooking;
