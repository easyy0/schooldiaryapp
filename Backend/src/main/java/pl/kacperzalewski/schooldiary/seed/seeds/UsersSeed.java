package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.repository.UserRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.util.List;

@Component
public class UsersSeed implements DataSeed {
    private record UserDef(String username, String firstname, String lastname, String password, UserRole role, SchoolClass schoolClass) {}
    private final UserRepository userRepository;

    @Autowired
    public UsersSeed(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public int order() {
        return 40;
    }

    @Override
    public boolean shouldRun() {
        return userRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<UserDef> defs = List.of(
                new UserDef("admin", "Admin", "Admin", "admin", UserRole.ADMIN, null),
                new UserDef("student1a", "Student", "A", "student1a", UserRole.STUDENT, ctx.schoolClass("1A")),
                new UserDef("student1b", "Student", "B", "student1b", UserRole.STUDENT, ctx.schoolClass("1B")),
                new UserDef("teacher", "Teacher", "Teacher", "teacher", UserRole.TEACHER, null)
        );

        List<User> saved = userRepository.saveAll(
                defs.stream().map(def ->
                        User.builder()
                            .username(def.username)
                            .firstname(def.firstname)
                            .lastname(def.lastname)
                            .password(new BCryptPasswordEncoder().encode(def.password))
                            .role(def.role)
                            .schoolClass(def.schoolClass)
                            .build())
                        .toList()
        );

        saved.forEach(u -> ctx.putUser(u.getUsername(), u));
    }
}
