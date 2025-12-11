import { api } from "./axios";

export const getLivePrice = (params: any) =>
  api.post("/pricing/calculate", params);

export const createPricingRule = (data: any) =>
  api.post("/pricing", data);

export const getPricingRules = () =>
  api.get("/pricing");
