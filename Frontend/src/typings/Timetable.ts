import { Room } from "./Room";
import { User } from "./User";

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type Timetable = {
    [key in DayOfWeek]: TimetableLesson[];
}

export type TimetableLesson = {
    id: number;
    dayOfWeek: DayOfWeek;
    lessonNumber: number;
    teacher: User;
    lessonSubject: string;
    room: Room
}