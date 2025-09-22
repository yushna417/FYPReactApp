import { IVeg } from "./vegetableInterface";

export interface IDailyPrice {
  id: number;
  vegetable:  IVeg; // Use number if you only receive the ID, or IVeg if full nested object
  date: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  daily_change: number | null;
  trend : "up" | "down" | "neutral"
}

export interface ReceivePrice {
  id: number;
  vegetable:  number; // Use number if you only receive the ID, or IVeg if full nested object
  date: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  daily_change: number | null;
  trend : "up" | "down" | "neutral"
}
