import axios from 'axios';
import { Config } from '../config';
import { MarkFormDTO, MarksBySubject } from '../typings/Mark';

export const MarksService = {
    GetMarks: async (accessToken: string | null, studentId: number, semester: string): Promise<MarksBySubject> => {
        const response = await axios.get<MarksBySubject>(`${Config.API_URL}/api/marks`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true,
            params: {
                studentId: studentId,
                semester: semester
            }
        });
        return response.data
    },
    AddStudentMark: async (
        accessToken: string | null,
        markFormDTO: MarkFormDTO
    ): Promise<void> => {
        const response = await axios.post(`${Config.API_URL}/api/marks/add`, markFormDTO, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
        return response.data
    },
};