package pl.kacperzalewski.schooldiary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserDTO(
        Long id,
        String firstname,
        String lastname,
        UserRole role,
        SchoolClassDTO schoolClass
) {
    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getRole(),
                SchoolClassDTO.fromEntity(user.getSchoolClass())
        );
    }
}