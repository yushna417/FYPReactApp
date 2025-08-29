
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


// export const BASE_URL = process.env.EXPO_BASE_URL;
export const BASE_URL = 'http://192.168.254.5:8000/api/';

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