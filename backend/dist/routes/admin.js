"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controller/admin");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/court", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), admin_1.createCourt);
router.post("/coach", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), admin_1.createCoach);
router.post("/equipment", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), admin_1.createEquipment);
router.post("/pricing-rule", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), admin_1.createPricingRule);
exports.default = router;
