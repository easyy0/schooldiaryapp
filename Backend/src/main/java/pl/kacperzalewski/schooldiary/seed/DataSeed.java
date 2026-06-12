package pl.kacperzalewski.schooldiary.seed;

public interface DataSeed {
    int order();
    boolean shouldRun();
    void seed(SeedContext ctx);
}