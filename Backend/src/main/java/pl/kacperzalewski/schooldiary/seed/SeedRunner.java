package pl.kacperzalewski.schooldiary.seed;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class SeedRunner implements CommandLineRunner {

    @Value("${app.seed.enabled:false}")
    private boolean seedEnabled;

    private final List<DataSeed> seeds;

    public SeedRunner(List<DataSeed> seeds) {
        this.seeds = seeds;
    }

    @Override
    public void run(String... args) {
        if (!seedEnabled) {
            return;
        }

        SeedContext ctx = new SeedContext();

        seeds.stream()
                .sorted(Comparator.comparingInt(DataSeed::order))
                .filter(DataSeed::shouldRun)
                .forEach(seed -> seed.seed(ctx));
    }
}
