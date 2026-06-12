package pl.kacperzalewski.schooldiary.util;

import pl.kacperzalewski.schooldiary.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserUtils {

    public static String getRolesAsString(User user) {
        return user.getRole().toString();
    }
}
