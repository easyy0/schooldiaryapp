package pl.kacperzalewski.schooldiary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Long id;
    private String firstname;
    private String lastname;

    private UserRole role;
}
