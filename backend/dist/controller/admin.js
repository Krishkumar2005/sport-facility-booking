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
exports.createPricingRule = exports.createEquipment = exports.createCoach = exports.createCourt = void 0;
const prisma_1 = require("../lib/prisma");
const createCourt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, price } = req.body;
    const court = yield prisma_1.prisma.court.create({ data: { name, type, price } });
    res.json(court);
});
exports.createCourt = createCourt;
const createCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const coach = yield prisma_1.prisma.coach.create({ data: { name } });
    res.json(coach);
});
exports.createCoach = createCoach;
const createEquipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, total } = req.body;
    const equipment = yield prisma_1.prisma.equipment.create({ data: { name, total } });
    res.json(equipment);
});
exports.createEquipment = createEquipment;
const createPricingRule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ruleType, startHour, endHour, multiplier } = req.body;
    const rule = yield prisma_1.prisma.pricingRule.create({ data: { name, ruleType, startHour, endHour, multiplier } });
    res.json(rule);
});
exports.createPricingRule = createPricingRule;
