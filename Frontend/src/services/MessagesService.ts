import axios from 'axios';
import { Config } from '../config';

export const MessagesService = {
    GetMessages: async (accessToken: string | null, page: number, filterName: string | null, searchParam: string | null): Promise<any> => {
        try {
            const response = await axios.get<any>(`${Config.API_URL}/api/messages`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
                params: {
                    page: page,
                    searchParam: searchParam,
                    messagesFilter: filterName
                }
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },
    GetUnreadMessagesCount: async (accessToken: string | null): Promise<any> => {
        try {
            const response = await axios.get<any>(`${Config.API_URL}/api/unread-messages-count`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },
    UpdateMessage: async (accessToken: string | null, messagesIds: Array<number>, method: string): Promise<any> => {
        try {
            const response = await axios.patch<any>(
                `${Config.API_URL}/api/messages`,
                {
                    messagesIds: messagesIds,
                    method: method
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    ReadMessageAndGetDescription: async (accessToken: string | null, messageId: number): Promise<any> => {
        try {
            const response = await axios.get<any>(
                `${Config.API_URL}/api/messages-read`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true,
                    params: {
                        messageId: messageId
                    }
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    SendMessage: async (accessToken: string | null, data: any): Promise<any> => {
        try {
            const response = await axios.post<any>(`${Config.API_URL}/api/messages`, JSON.stringify(data), {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}