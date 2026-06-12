import { User } from "./User";

export interface News {
    id: number,
    user: User,
    header: string,
    title: string,
    description: string,
    date: number
}