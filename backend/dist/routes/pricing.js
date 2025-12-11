"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_pricing_preview_1 = require("../controller/user.pricing.preview");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/preview", auth_1.authenticate, user_pricing_preview_1.getPricingPreview);
exports.default = router;
