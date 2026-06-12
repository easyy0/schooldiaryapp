package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.kacperzalewski.schooldiary.dto.TimetableLessonDTO;
import pl.kacperzalewski.schooldiary.entity.Timetable;
import pl.kacperzalewski.schooldiary.entity.TimetableLesson;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;
import pl.kacperzalewski.schooldiary.repository.TimetableRepository;

import java.time.DayOfWeek;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    @Autowired
    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }


    @Transactional(readOnly = true)
    public Map<DayOfWeek, List<TimetableLessonDTO>> getTimetableClassLessons(Long id) {
        Timetable timetable = timetableRepository.findById(id)
                .orElse(
                        Timetable.builder()
                                .lessons(new ArrayList<>())
                                .build()
                );

        Map<DayOfWeek, List<TimetableLessonDTO>> lessonsByDay = new EnumMap<>(DayOfWeek.class);

        for (DayOfWeek day : DayOfWeek.values()) {
            Map<Integer, TimetableLessonDTO> lessonsMap = timetable.getLessons().stream()
                    .filter(lesson -> lesson.getDayOfWeek() == day)
                    .map(TimetableLessonDTO::fromEntity)
                    .collect(Collectors.toMap(
                            TimetableLessonDTO::lessonNumber,
                            dto -> dto,
                            (a, b) -> a
                    ));

            List<TimetableLessonDTO> fullList = IntStream.range(0, 15)
                    .mapToObj(lessonsMap::get)
                    .toList();

            lessonsByDay.put(day, fullList);
        }

        return lessonsByDay;
    }
}
