package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.SchoolClassDTO;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.repository.SchoolClassRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolClassService {

    private final SchoolClassRepository schoolClassRepository;

    @Autowired
    public SchoolClassService(SchoolClassRepository schoolClassRepository) {
        this.schoolClassRepository = schoolClassRepository;
    }

    public List<SchoolClassDTO> getSchoolClasses() {
        List<SchoolClass> classes = schoolClassRepository.findAll();
        return classes
                .stream()
                .map(schoolClass -> new SchoolClassDTO(schoolClass.getId(), schoolClass.getName()))
                .collect(Collectors.toList());
    }

    public SchoolClass getSchoolClass(long id) {
        return schoolClassRepository.findById(id).orElse(null);
    }
}