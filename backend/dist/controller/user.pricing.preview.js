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
exports.getPricingPreview = void 0;
const calculatePricing_1 = require("../utils/calculatePricing");
const getPricingPreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courtId, startTime, endTime, coachId, equipments } = req.body;
        const price = yield (0, calculatePricing_1.calculatePricing)({ courtId, start: new Date(startTime), end: new Date(endTime), coachId, equipments });
        res.json({ price });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getPricingPreview = getPricingPreview;
