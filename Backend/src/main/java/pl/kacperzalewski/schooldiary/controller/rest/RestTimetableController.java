package pl.kacperzalewski.schooldiary.controller.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.dto.SchoolClassDTO;
import pl.kacperzalewski.schooldiary.service.SchoolClassService;
import pl.kacperzalewski.schooldiary.service.TimetableService;

import java.util.List;

@RestController
public class RestTimetableController {

    private final TimetableService timetableService;

    @Autowired
    public RestTimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/api/timetable")
    public ResponseEntity<?> getTimetable(@RequestParam(value = "classId", required = true) long classId) {
        return ResponseEntity.ok(timetableService.getTimetableClassLessons(classId));
    }
}