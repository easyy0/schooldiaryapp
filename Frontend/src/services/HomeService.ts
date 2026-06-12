import axios from "axios";
import { Config } from "../config";
import { News } from "../typings/News";

export interface HomeResponse {
    news: Set<News>;
}

export const HomeService_GetData = async (
    accessToken: string | null
): Promise<Set<News>> => {
    try {
        const response = await axios.get<Set<News>>(
            `${Config.API_URL}/api/home`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
