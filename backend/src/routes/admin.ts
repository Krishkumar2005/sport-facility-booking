import express from "express";
import { createCourt, createCoach, createEquipment, createPricingRule } from "../controller/admin";

import {authenticate, authorize } from "../middleware/auth";

const router = express.Router();
router.post("/court", authenticate, authorize(["admin"]), createCourt);
router.post("/coach", authenticate, authorize(["admin"]), createCoach);
router.post("/equipment", authenticate, authorize(["admin"]), createEquipment);
router.post("/pricing-rule", authenticate, authorize(["admin"]), createPricingRule);
export default router;