package pl.kacperzalewski.schooldiary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import pl.kacperzalewski.schooldiary.entity.Room;
import pl.kacperzalewski.schooldiary.entity.TimetableLesson;
import pl.kacperzalewski.schooldiary.entity.User;

import java.time.DayOfWeek;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TimetableLessonDTO(
        Long id,
        DayOfWeek dayOfWeek,
        int lessonNumber,
        UserDTO teacher,
        String lessonSubject,
        Room room
) {
    public static TimetableLessonDTO fromEntity(TimetableLesson lesson) {
        User teacher = lesson.getTeacher();

        return new TimetableLessonDTO(
                lesson.getId(),
                lesson.getDayOfWeek(),
                lesson.getLessonNumber(),
                UserDTO.fromEntity(teacher),
                lesson.getSubject().getName(),
                lesson.getRoom()
        );
    }
}