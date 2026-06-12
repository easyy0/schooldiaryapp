package pl.kacperzalewski.schooldiary;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.kacperzalewski.schooldiary.dto.TimetableLessonDTO;
import pl.kacperzalewski.schooldiary.entity.Room;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.Timetable;
import pl.kacperzalewski.schooldiary.entity.TimetableLesson;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.repository.TimetableRepository;
import pl.kacperzalewski.schooldiary.service.TimetableService;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TimetableServiceTest {

    @Mock
    private TimetableRepository timetableRepository;

    @Test
    void shouldReturnLessonsGroupedByDayWithEmptySlots() {
        TimetableService timetableService = new TimetableService(timetableRepository);

        TimetableLesson mathLesson = createLesson(1L, DayOfWeek.MONDAY, 2, "MATH");
        Timetable timetable = Timetable.builder()
                .lessons(List.of(mathLesson))
                .build();

        when(timetableRepository.findById(1L)).thenReturn(Optional.of(timetable));

        Map<DayOfWeek, List<TimetableLessonDTO>> result = timetableService.getTimetableClassLessons(1L);

        assertEquals(7, result.size());
        assertEquals(15, result.get(DayOfWeek.MONDAY).size());
        assertEquals("MATH", result.get(DayOfWeek.MONDAY).get(2).lessonSubject());
        assertEquals(2, result.get(DayOfWeek.MONDAY).get(2).lessonNumber());
        assertNull(result.get(DayOfWeek.MONDAY).get(1));
        assertNull(result.get(DayOfWeek.TUESDAY).get(2));
    }

    @Test
    void shouldReturnEmptyTimetableWhenTimetableDoesNotExist() {
        TimetableService timetableService = new TimetableService(timetableRepository);

        when(timetableRepository.findById(99L)).thenReturn(Optional.empty());

        Map<DayOfWeek, List<TimetableLessonDTO>> result = timetableService.getTimetableClassLessons(99L);

        assertEquals(7, result.size());
        result.values().forEach(dayLessons -> {
            assertEquals(15, dayLessons.size());
            dayLessons.forEach(Assertions::assertNull);
        });
    }

    private TimetableLesson createLesson(Long id, DayOfWeek dayOfWeek, int lessonNumber, String subjectName) {
        TimetableLesson lesson = new TimetableLesson();
        lesson.setId(id);
        lesson.setDayOfWeek(dayOfWeek);
        lesson.setLessonNumber(lessonNumber);
        lesson.setSubject(Subject.builder().name(subjectName).build());
        lesson.setRoom(Room.builder().id(101L).build());
        lesson.setTeacher(User.builder()
                .id(1L)
                .firstname("Jan")
                .lastname("Kowalski")
                .role(UserRole.TEACHER)
                .build());
        return lesson;
    }
}
