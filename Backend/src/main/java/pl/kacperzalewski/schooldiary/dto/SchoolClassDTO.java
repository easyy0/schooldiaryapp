package pl.kacperzalewski.schooldiary.dto;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;

public record SchoolClassDTO(
        Long id,
        String name
) {
    public static SchoolClassDTO fromEntity(SchoolClass schoolClass) {
        if (schoolClass == null) {
            return null;
        }

        return new SchoolClassDTO(schoolClass.getId(), schoolClass.getName());
    }
}
