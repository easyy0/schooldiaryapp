package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.repository.SubjectRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.util.List;

@Component
public class LessonsSeed implements DataSeed {

    private final SubjectRepository subjectRepository;

    public LessonsSeed(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override public int order() { return 0; }
    @Override public boolean shouldRun() { return subjectRepository.count() == 0; }

    @Override
    public void seed(SeedContext ctx) {
        List<String> names = List.of(
                "MATH",
                "PHYSICS",
                "CHEMISTRY",
                "BIOLOGY",
                "IT",
                "POLISH",
                "HISTORY",
                "CIVICS",
                "PHILOSOPHY",
                "GERMAN",
                "FRENCH",
                "SPANISH",
                "MUSIC",
                "ART",
                "PE",
                "TECHNOLOGY",
                "SAFETY_EDUCATION",
                "NATURE",
                "ENGLISH"
        );

        List<Subject> saved = subjectRepository.saveAll(
                names.stream().map(n -> Subject.builder().name(n).build()).toList()
        );

        saved.forEach(l -> ctx.putSubject(l.getName(), l));
    }
}
