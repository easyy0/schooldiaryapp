package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.Mark;
import pl.kacperzalewski.schooldiary.repository.MarkRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.math.BigDecimal;
import java.util.List;

@Component
public class MarksSeed implements DataSeed {
    private record MarkDef(String code, String symbol, String numeric) {}

    private final MarkRepository markRepository;

    public MarksSeed(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    @Override
    public int order() { return 10; }

    @Override
    public boolean shouldRun() {
        return markRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<MarkDef> defs = List.of(
                new MarkDef("ONE_MINUS",   "1-", "0.75"),
                new MarkDef("ONE",         "1",  "1"),
                new MarkDef("ONE_PLUS",    "1+", "1.25"),

                new MarkDef("TWO_MINUS",   "2-", "1.75"),
                new MarkDef("TWO",         "2",  "2"),
                new MarkDef("TWO_PLUS",    "2+", "2.25"),

                new MarkDef("THREE_MINUS", "3-", "2.75"),
                new MarkDef("THREE",       "3",  "3"),
                new MarkDef("THREE_PLUS",  "3+", "3.25"),

                new MarkDef("FOUR_MINUS",  "4-", "3.75"),
                new MarkDef("FOUR",        "4",  "4"),
                new MarkDef("FOUR_PLUS",   "4+", "4.25"),

                new MarkDef("FIVE_MINUS",  "5-", "4.75"),
                new MarkDef("FIVE",        "5",  "5"),
                new MarkDef("FIVE_PLUS",   "5+", "5.25"),

                new MarkDef("SIX_MINUS",   "6-", "5.75"),
                new MarkDef("SIX",         "6",  "6"),
                new MarkDef("SIX_PLUS",    "6+", "6.25")
        );

        List<Mark> saved = markRepository.saveAll(
                defs.stream().map(d ->
                        Mark.builder()
                                .code(d.code())
                                .symbol(d.symbol())
                                .numericValue(new BigDecimal(d.numeric()))
                                .build())
                        .toList()
        );

        saved.forEach(m -> ctx.putMark(m.getCode(), m));
    }
}
