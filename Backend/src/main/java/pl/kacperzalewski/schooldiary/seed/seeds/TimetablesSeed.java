package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.*;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.repository.TimetableRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
public class TimetablesSeed implements DataSeed {
    private record TimetableDef(SchoolClass schoolClass, LocalDate validFrom, LocalDate validTo) {}
    private final TimetableRepository timetableRepository;

    @Autowired
    public TimetablesSeed(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    @Override
    public int order() {
        return 50;
    }

    @Override
    public boolean shouldRun() {
        return timetableRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        Random random = new Random();
        Map<String, SchoolClass> classes = ctx.schoolClasses();
        List<Room> rooms = ctx.rooms();
        List<Subject> subjects = ctx.subjects();
        List<User> teachers = ctx.users().stream()
                .filter(u -> u.getRole() == UserRole.TEACHER)
                .toList();

        List<DayOfWeek> days = List.of(
                DayOfWeek.MONDAY,
                DayOfWeek.TUESDAY,
                DayOfWeek.WEDNESDAY,
                DayOfWeek.THURSDAY,
                DayOfWeek.FRIDAY
        );

        List<Timetable> saved = new ArrayList<>();

        for (SchoolClass schoolClass : classes.values()) {
            Timetable timetable = new Timetable();
            timetable.setSchoolClass(schoolClass);
            timetable.setValidFrom(LocalDate.of(2026, 1, 5));
            timetable.setValidTo(LocalDate.of(2026, 1, 12));

            if (timetable.getLessons() == null) {
                timetable.setLessons(new ArrayList<>());
            }

            for (DayOfWeek day : days) {
                for (int lessonNo = 1; lessonNo <= 15; lessonNo++) {

                    if (random.nextInt(2) == 0) continue;

                    TimetableLesson tl = new TimetableLesson();
                    tl.setTimetable(timetable);
                    tl.setDayOfWeek(day);
                    tl.setLessonNumber(lessonNo);

                    tl.setRoom(rooms.get(random.nextInt(rooms.size())));
                    tl.setSubject(subjects.get(random.nextInt(subjects.size())));
                    tl.setTeacher(teachers.get(random.nextInt(teachers.size())));

                    timetable.getLessons().add(tl);
                }
            }

            saved.add(timetable);
        }

        timetableRepository.saveAll(saved);
    }
}
