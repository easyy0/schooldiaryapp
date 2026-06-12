package pl.kacperzalewski.schooldiary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import pl.kacperzalewski.schooldiary.entity.UserMark;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserMarkDTO(
        Long id,
        String title,
        UserDTO fromUser,
        String subjectName,
        Integer weight,
        MarkDTO mark,
        LocalDateTime date
) {
    public static UserMarkDTO fromEntity(UserMark userMark) {
        return new UserMarkDTO(
                userMark.getId(),
                userMark.getTitle(),
                UserDTO.fromEntity(userMark.getFromUser()),
                userMark.getSubject().getName(),
                userMark.getWeight(),
                MarkDTO.fromEntity(userMark.getMark()),
                userMark.getDate()
        );
    }
}