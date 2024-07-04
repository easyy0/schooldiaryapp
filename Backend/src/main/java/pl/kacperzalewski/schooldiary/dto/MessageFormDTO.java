package pl.kacperzalewski.schooldiary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageFormDTO {
    private String receivers;

    private String title;

    private String message;

    private Boolean isImportant;
}
