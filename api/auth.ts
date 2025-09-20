import apiClient from "./axios"
import { ILoginPayload } from "@/types/loginPayloadInterface"
import { IUser, UserData } from "@/types/userInterface"
import { Role } from "@/types/userInterface"
import { BASE_URL } from "@/apikey"

export const Login_URL = `${BASE_URL}token/`
export const Refresh_URL = `${BASE_URL}token/refresh/`
export const Logout_URL = `${BASE_URL}logout`
export const Register_URL = `${BASE_URL}user/register`
export const LogggedIn_URL = `${BASE_URL}is_loggedIn/`

export type TokenResponse = {
  access: string;
  refresh: string;
}

export const login = async (data: ILoginPayload):  Promise<TokenResponse & { role: Role }> => {
  const response = await apiClient.post(Login_URL, data);
  return response.data;
};

export const register = async (data: IUser): Promise<void> => {
  await apiClient.post(Register_URL, data);
};

export const logout = async (): Promise<void> => {
  await apiClient.post(Logout_URL);
};

export const checkAuth = async (): Promise<{isAuthenticated: boolean, user?: UserData}> => {
  try {
    const response = await apiClient.get(LogggedIn_URL);
    return {
      isAuthenticated: true,
      user: response.data as UserData
    };
  } catch (error) {
    return {
      isAuthenticated: false
    };
  }
};

export const refreshToken = async (refreshToken: string): Promise<TokenResponse> => {
  const response = await apiClient.post(Refresh_URL, { refresh: refreshToken });
  return response.data;
};