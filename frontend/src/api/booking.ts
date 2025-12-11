import { api } from "./axios";

export const createBooking = (data: any) =>
  api.post("/booking", data);
