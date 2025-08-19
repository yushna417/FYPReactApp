import { IDailyPrice } from '@/types/dailyPriceInterface';
import { IVeg } from '@/types/vegetableInterface';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const BASE_URL = 'http://192.168.254.4:8000/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'}
    
});

// Add request interceptor to include token
apiClient.interceptors.request.use(async (config) => {

 
  
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default apiClient;