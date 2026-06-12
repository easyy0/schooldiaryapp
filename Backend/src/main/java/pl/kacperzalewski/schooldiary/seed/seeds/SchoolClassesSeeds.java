package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.repository.SchoolClassRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;
import java.util.List;

@Component
public class SchoolClassesSeeds implements DataSeed {
    private record SchoolClassDef(String name, List<Subject> subjectList) {}
    private final SchoolClassRepository schoolClassRepository;

    @Autowired
    public SchoolClassesSeeds(SchoolClassRepository schoolClassRepository) {
        this.schoolClassRepository = schoolClassRepository;
    }

    @Override
    public int order() {
        return 30;
    }

    @Override
    public boolean shouldRun() {
        return schoolClassRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<SchoolClassDef> defs = List.of(
                new SchoolClassDef("1A", List.of(
                    ctx.subject("MATH"),
                    ctx.subject("PHYSICS"),
                    ctx.subject("CHEMISTRY"),
                    ctx.subject("BIOLOGY"),
                    ctx.subject("IT"),
                    ctx.subject("POLISH"),
                    ctx.subject("HISTORY"),
                    ctx.subject("CIVICS"),
                    ctx.subject("PHILOSOPHY"),
                    ctx.subject("GERMAN"),
                    ctx.subject("FRENCH"),
                    ctx.subject("SPANISH"),
                    ctx.subject("ENGLISH"),
                    ctx.subject("MUSIC"),
                    ctx.subject("ART"),
                    ctx.subject("PE")
                )),
                new SchoolClassDef("1B", List.of(
                    ctx.subject("MATH"),
                    ctx.subject("POLISH"),
                    ctx.subject("ENGLISH")
                )),
                new SchoolClassDef("1C", List.of(
                    ctx.subject("MATH"),
                    ctx.subject("POLISH"),
                    ctx.subject("ENGLISH")
                )),
                new SchoolClassDef("1D", List.of(
                    ctx.subject("MATH"),
                    ctx.subject("POLISH"),
                    ctx.subject("ENGLISH")
                )),
                new SchoolClassDef("1E", List.of(
                    ctx.subject("MATH"),
                    ctx.subject("POLISH"),
                    ctx.subject("ENGLISH")
                ))
        );

        List<SchoolClass> saved = schoolClassRepository.saveAll(
                defs.stream().map(d ->
                                SchoolClass.builder()
                                        .subjectList(d.subjectList)
                                        .name(d.name)
                                        .build())
                        .toList()
        );

        saved.forEach(schoolClass -> ctx.putClass(schoolClass.getName(), schoolClass));
    }
}
