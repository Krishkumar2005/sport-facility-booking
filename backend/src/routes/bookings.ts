import express from "express";
import { createBooking } from "../controller/user.booking";
import { authenticate } from "../middleware/auth";
const router = express.Router();
router.post("/", authenticate ,createBooking);
export default router;