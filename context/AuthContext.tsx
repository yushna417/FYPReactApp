import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { login, register, logout, checkAuth, refreshToken } from '../api/auth';
import { ILoginPayload } from '@/types/loginPayloadInterface';
import { IUser } from '@/types/userInterface';
import apiClient from '@/api/axios';
import { LogggedIn_URL } from '../api/auth';
import { Alert } from 'react-native';


type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  user: IUser | null; 
  isAuthenticated: boolean;
  login: (data:ILoginPayload) => Promise<void>;
  register: (userData: IUser) => Promise<void>;
  logout: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('authToken');
        const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');
        
        if (storedToken && storedRefreshToken) {
          const isValid = await checkAuth();
          if (isValid) {
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            try {
              const { access } = await refreshToken(storedRefreshToken);
              await SecureStore.setItemAsync('authToken', access);
              setToken(access);
              setIsAuthenticated(true);
            } catch (refreshError) {
              await clearTokens();
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearTokens = async () => {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleLogin = async (data:ILoginPayload) => {
    try {
      const { access, refresh, role } = await login(data);

       if (role !== data.role) {
          Alert.alert('Role mismatch', `You are registered as a ${role}, not a ${data.role}.`);
          return;
        }
      await SecureStore.setItemAsync('authToken', access);
      await SecureStore.setItemAsync('refreshToken', refresh);

      const userResponse = await apiClient.get(LogggedIn_URL);
      setUser(userResponse.data);

      setToken(access);
      setIsAuthenticated(true);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      await clearTokens();
      router.replace('/login');
    }
  };

 const handleRegister = async (userData: IUser) => {
  try {
    await register(userData);
    router.replace('/login');
  } catch (error) {
    console.error('Registration error:', error);
    throw error; 
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};