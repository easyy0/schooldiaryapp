import axios from 'axios';
import { Config } from '../config';

export const TimetableService = {
    GetTimetable: async (accessToken: string | null, classId: number): Promise<any> => {
        try {
            const response = await axios.get<any>(`${Config.API_URL}/api/timetable`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true,
                params: {
                    classId: classId
                }
            });
            return response.data
        } catch (error) {
            throw error;
        }
    },
}