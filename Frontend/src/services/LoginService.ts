import axios from 'axios';
import { Config } from '../config';

export interface LoginResponse {
  jwtToken: string;
}

export const LoginService_Login = async (username: string, password: string, accessToken: string | null): Promise<LoginResponse> => {
  const data = {
    username: username,
    password: password
  };

  try {
    const response = await axios.post<LoginResponse>(`${Config.API_URL}/login`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    throw error
  }
};