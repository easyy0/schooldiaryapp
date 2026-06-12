package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.dto.SchoolClassDTO;
import pl.kacperzalewski.schooldiary.dto.UserDTO;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.service.SchoolClassService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RestSchoolClassController {

    private final SchoolClassService schoolClassService;

    @Autowired
    public RestSchoolClassController(SchoolClassService schoolClassService) {
        this.schoolClassService = schoolClassService;
    }

    @GetMapping("/api/schoolclass/classes")
    public ResponseEntity<List<SchoolClassDTO>> getSchoolClasses() {
        List<SchoolClassDTO> schoolClassDTOs = schoolClassService.getSchoolClasses();

        return ResponseEntity.ok(schoolClassDTOs);
    }

    @GetMapping("/api/schoolclass/class/students")
    public ResponseEntity<List<UserDTO>> getSchoolClassStudents(@RequestParam(value = "classId", required = true) long classId) {
        List<User> students = schoolClassService.getSchoolClass(classId).getStudents();

        return ResponseEntity.ok(students.stream().map(UserDTO::fromEntity).collect(Collectors.toList()));
    }

    @GetMapping("/api/schoolclass/class/subjects")
    public ResponseEntity<List<String>> getSchoolClassSubjects(@RequestParam(value = "classId", required = true) long classId) {
        List<Subject> subjects = schoolClassService.getSchoolClass(classId).getSubjectList();

        return ResponseEntity.ok(subjects.stream().map(Subject::getName).sorted().collect(Collectors.toList()));
    }
}