package pl.kacperzalewski.schooldiary.dto;

import pl.kacperzalewski.schooldiary.entity.Mark;

public record MarkDTO(
        String code,
        String symbol
) {
    public static MarkDTO fromEntity(Mark mark) {
        return new MarkDTO(
                mark.getCode(),
                mark.getSymbol()
        );
    }
}
