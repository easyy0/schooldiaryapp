package pl.kacperzalewski.schooldiary.controller.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.kacperzalewski.schooldiary.dto.MarkFormDTO;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.service.UserMarkService;
import pl.kacperzalewski.schooldiary.service.UserService;

@RestController
public class RestUserMarkController {
    private final UserMarkService userMarkService;

    @Autowired
    public RestUserMarkController(UserMarkService userMarkService) {
        this.userMarkService = userMarkService;
    }

    @GetMapping("/api/marks")
    @PreAuthorize("hasAnyAuthority('TEACHER', 'ADMIN') or principal.id == #studentId")
    public ResponseEntity<?> getStudentMarks(
            @RequestParam(value = "studentId", required = true) long studentId,
            @RequestParam(value = "semester", required = true) Semester semester
    ) {
        try {
            return ResponseEntity.ok(userMarkService.getUserMarks(studentId, semester));
        } catch (BadCredentialsException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/marks/add")
    @PreAuthorize("hasAnyAuthority('TEACHER', 'ADMIN')")
    public ResponseEntity<?> addStudentMark(@Valid @RequestBody MarkFormDTO markFormDTO) {
        try {
            userMarkService.addStudentMark(markFormDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
