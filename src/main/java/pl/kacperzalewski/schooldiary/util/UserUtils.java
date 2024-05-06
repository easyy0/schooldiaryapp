package pl.kacperzalewski.schooldiary.util;

import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserRole;

import java.util.Set;
import java.util.stream.Collectors;

public class UserUtils {

    public static Set<String> getRolesAsString(User user) {
        return user.getRoles().stream()
                .map(UserRole::getName)
                .collect(Collectors.toSet());
    }
}
