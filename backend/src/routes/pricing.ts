import express from "express";
import { getPricingPreview } from "../controller/user.pricing.preview";
import { authenticate } from "../middleware/auth";
const router = express.Router();
router.post("/preview", authenticate, getPricingPreview);
export default router;