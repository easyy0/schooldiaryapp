import { SchoolClass } from "./SchoolClass";

export type User = UserMinimized & {
    role: string,
    schoolClass?: SchoolClass
}

export interface UserMinimized {
    id: number,
    firstname: string,
    lastname: string,
}