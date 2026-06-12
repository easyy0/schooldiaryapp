package pl.kacperzalewski.schooldiary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageFormDTO {

    @NotEmpty(message = "At least one receiver is required")
    private long[] receivers;

    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "Title cannot be longer than 120 characters")
    private String title;

    @NotBlank(message = "Message is required")
    @Size(max = 5000, message = "Message cannot be longer than 5000 characters")
    private String message;

    private Boolean isImportant;
}
