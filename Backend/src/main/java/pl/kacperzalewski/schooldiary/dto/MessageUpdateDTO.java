package pl.kacperzalewski.schooldiary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageUpdateDTO {

    @NotEmpty(message = "At least one message id is required")
    private long[] messagesIds;

    @NotBlank(message = "Update method is required")
    @Pattern(regexp = "READ|ARCHIVE|DELETE", message = "Method must be one of: READ, ARCHIVE, DELETE")
    private String method;
}
