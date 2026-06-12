import axios from 'axios';
import { Config } from '../config';
import { SchoolClass } from '../typings/SchoolClass';
import { UserMinimized } from '../typings/User';

export const SchoolClassService = {
    GetSchoolClasses: async (accessToken: string | null): Promise<SchoolClass[]> => {
        const response = await axios.get<SchoolClass[]>(`${Config.API_URL}/api/schoolclass/classes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
        return response.data
    },
    GetClassStudents: async (accessToken: string | null, classId: number): Promise<UserMinimized[]> => {
        const response = await axios.get<UserMinimized[]>(`${Config.API_URL}/api/schoolclass/class/students`, {
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
    },
    GetClassSubjects: async (accessToken: string | null, classId: number): Promise<string[]> => {
        const response = await axios.get<string[]>(`${Config.API_URL}/api/schoolclass/class/subjects`, {
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
    },
}
