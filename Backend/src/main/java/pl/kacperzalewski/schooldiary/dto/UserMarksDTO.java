package pl.kacperzalewski.schooldiary.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserMarksDTO(
        float semestralAverage,
        float annualAverage,
        List<UserMarkDTO> marks
) {}