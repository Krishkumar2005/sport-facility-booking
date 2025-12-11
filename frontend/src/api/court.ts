import { api } from "./axios";

export const getCourts = () => api.get("/courts");
