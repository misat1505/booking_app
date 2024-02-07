import { User } from "@/models/User";

export type HotelIncome = {
  uid: string;
  name: string;
  income: number;
};

export type HotelBookings = {
  uid: string;
  name: string;
  bookings: number;
};

export type TopCustomer = {
  user: Omit<User, "role">;
  totalBookings: number;
};
