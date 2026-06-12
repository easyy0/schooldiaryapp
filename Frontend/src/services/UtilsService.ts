import axios from "axios";
import { Config } from "../config";
import { User } from "../typings/User";

export const UtilsService = {
    GetUsers: async (accessToken: string | null, role: string | null) => {
        try {
            const response = await axios.get<any>(`${Config.API_URL}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
                params: {
                    role: role
                }
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },
    GetUser: async (accessToken: string | null, userId: number | null): Promise<User> => {
        try {
            const response = await axios.get<User>(`${Config.API_URL}/api/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
                params: {
                    userId: userId
                }
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },
}