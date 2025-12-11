"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_booking_1 = require("../controller/user.booking");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, user_booking_1.createBooking);
exports.default = router;
