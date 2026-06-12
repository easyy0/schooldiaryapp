package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.Mark;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserMark;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;
import pl.kacperzalewski.schooldiary.repository.UserMarkRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class UserMarksSeed implements DataSeed {
    private record UserMarkDef(User fromUser, User toUser, Integer weight, Mark mark, Semester semester, Subject subject, String title) {}
    private final UserMarkRepository userMarkRepository;

    @Autowired
    public UserMarksSeed(UserMarkRepository userMarkRepository) {
        this.userMarkRepository = userMarkRepository;
    }

    @Override
    public int order() {
        return 70;
    }

    @Override
    public boolean shouldRun() {
        return userMarkRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<UserMarkDef> defs = List.of(
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("FIVE_PLUS"), Semester.FIRST, ctx.subject("MATH"), "Kartkówka - liczby całkowite"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("THREE"), Semester.FIRST, ctx.subject("MATH"), "Sprawdzian - równania"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("FOUR_MINUS"), Semester.FIRST, ctx.subject("MATH"), "Odpowiedź ustna - geometria"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("TWO"), Semester.FIRST, ctx.subject("MATH"), "Kartkówka - ułamki"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("FIVE"), Semester.FIRST, ctx.subject("MATH"), "Sprawdzian - procenty"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("ONE_MINUS"), Semester.FIRST, ctx.subject("MATH"), "Praca domowa - algebra"),

                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("SIX"), Semester.SECOND, ctx.subject("MATH"), "Sprawdzian - funkcje"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("FOUR"), Semester.SECOND, ctx.subject("MATH"), "Kartkówka - potęgi"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("THREE_PLUS"), Semester.SECOND, ctx.subject("MATH"), "Odpowiedź ustna - statystyka"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("TWO_MINUS"), Semester.SECOND, ctx.subject("MATH"), "Praca klasowa - geometria przestrzenna"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("FIVE_MINUS"), Semester.SECOND, ctx.subject("MATH"), "Kartkówka - pierwiastki"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("FOUR_PLUS"), Semester.SECOND, ctx.subject("MATH"), "Aktywność na lekcji"),

                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("THREE"), Semester.FIRST, ctx.subject("POLISH"), "Wypracowanie - rozprawka"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("FOUR_PLUS"), Semester.FIRST, ctx.subject("POLISH"), "Kartkówka - lektura"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("TWO"), Semester.FIRST, ctx.subject("POLISH"), "Dyktando"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("FIVE_MINUS"), Semester.FIRST, ctx.subject("POLISH"), "Interpretacja wiersza"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("ONE_PLUS"), Semester.FIRST, ctx.subject("POLISH"), "Czytanie ze zrozumieniem"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("SIX"), Semester.FIRST, ctx.subject("POLISH"), "Prezentacja o romantyzmie"),

                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("FOUR"), Semester.SECOND, ctx.subject("POLISH"), "Wypracowanie - charakterystyka"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("THREE_MINUS"), Semester.SECOND, ctx.subject("POLISH"), "Kartkówka - gramatyka"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("FIVE_PLUS"), Semester.SECOND, ctx.subject("POLISH"), "Analiza tekstu literackiego"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("TWO_PLUS"), Semester.SECOND, ctx.subject("POLISH"), "Dyktando - interpunkcja"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("FOUR_MINUS"), Semester.SECOND, ctx.subject("POLISH"), "Odpowiedź ustna - lektura"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("THREE"), Semester.SECOND, ctx.subject("POLISH"), "Praca domowa - esej"),

                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("SIX"), Semester.FIRST, ctx.subject("ENGLISH"), "Test - czasy gramatyczne"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("FIVE"), Semester.FIRST, ctx.subject("ENGLISH"), "Kartkówka - słownictwo"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("FOUR_PLUS"), Semester.FIRST, ctx.subject("ENGLISH"), "Listening"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("THREE_MINUS"), Semester.FIRST, ctx.subject("ENGLISH"), "Reading comprehension"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("TWO_PLUS"), Semester.FIRST, ctx.subject("ENGLISH"), "Odpowiedź ustna"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("FIVE_PLUS"), Semester.FIRST, ctx.subject("ENGLISH"), "Projekt grupowy"),

                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 0, ctx.mark("TWO_MINUS"), Semester.SECOND, ctx.subject("ENGLISH"), "Kartkówka - phrasal verbs"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 1, ctx.mark("THREE_PLUS"), Semester.SECOND, ctx.subject("ENGLISH"), "Essay writing"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 2, ctx.mark("FOUR"), Semester.SECOND, ctx.subject("ENGLISH"), "Test - modal verbs"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 3, ctx.mark("FIVE_MINUS"), Semester.SECOND, ctx.subject("ENGLISH"), "Speaking test"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 4, ctx.mark("ONE_MINUS"), Semester.SECOND, ctx.subject("ENGLISH"), "Nieoddana praca domowa"),
                new UserMarkDef(ctx.user("teacher"), ctx.user("student1a"), 5, ctx.mark("SIX"), Semester.SECOND, ctx.subject("ENGLISH"), "Prezentacja po angielsku")
        );

        userMarkRepository.saveAll(
                defs.stream().map(def ->
                        UserMark.builder()
                                .title(def.title)
                                .fromUser(def.fromUser)
                                .toUser(def.toUser)
                                .weight(def.weight)
                                .mark(def.mark)
                                .semester(def.semester)
                                .subject(def.subject)
                                .date(LocalDateTime.now())
                                .build()).toList()
        );
    }
}
