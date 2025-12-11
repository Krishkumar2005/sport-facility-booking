import { api } from "./axios";

export const getCoaches = () => api.get("/coaches");

export const getEquipment = () => api.get("/equipment");
