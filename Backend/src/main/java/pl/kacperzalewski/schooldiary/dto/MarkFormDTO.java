package pl.kacperzalewski.schooldiary.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;

public record MarkFormDTO(
        @NotNull(message = "Student id is required")
        Long studentId,

        @NotBlank(message = "Subject name is required")
        String subjectName,

        @NotBlank(message = "Mark code is required")
        String markCode,

        @NotBlank(message = "Title is required")
        String title,

        @Min(value = 1, message = "Weight must be at least 1")
        @Max(value = 5, message = "Weight cannot be greater than 5")
        int weight,

        @NotNull(message = "Semester is required")
        Semester semester
) {
}
