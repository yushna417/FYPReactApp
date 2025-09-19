
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";
import { BASE_URL } from '@/apikey';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'}
    
});

apiClient.interceptors.request.use(async (config) => {  
  const token = await SecureStore.getItemAsync('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default apiClient;