import { User } from "./User";

export const Weight = [
    0,1,2,3,4,5
]

export type UserMark = {
    id: number,
    title: string,
    fromUser: User,
    subjectName: string,
    weight: number,
    mark: Mark,
    date: string
}

export type UserMarks = {
    annualAverage: number,
    semestralAverage: number,
    marks: UserMark[]
}

export type Mark = {
    code: string,
    symbol: string
}

export type MarksBySubject = Record<string, UserMarks>;

export type MarkOption = {
    code: string;
    symbol: string;
};

export type SubjectOption = {
    name: string;
};

export type MarkFormDTO = {
    studentId: number;
    subjectName: string;
    markCode: string;
    title: string;
    semester: string;
    weight: number;
}