import { IVeg } from "@/types/vegetableInterface";
import apiClient from "./axios";
import { IDailyPrice } from "@/types/dailyPriceInterface";



export const VegetableService = {
  getAllVegetables: async(): Promise<IVeg[]> => {
    const response = await apiClient.get('vegetables/');
    return response.data;
  },

  getDailyPrices: async (vegetableId: number): Promise<IDailyPrice[]> => {
    const response = await apiClient.get(`daily-prices/?vegetable=${vegetableId}&ordering=-date`);
    return response.data;
  },

  getLatestPrices: async (): Promise<IDailyPrice[]> => {
    const today = new Date().toISOString().split("T")[0];
    const response = await apiClient.get(
      `daily-prices/with_daily_change/?date=${today}`
    );
    return response.data;
  }
}