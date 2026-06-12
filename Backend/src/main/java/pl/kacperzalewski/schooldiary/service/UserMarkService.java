package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.*;
import pl.kacperzalewski.schooldiary.entity.Mark;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserMark;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.repository.MarkRepository;
import pl.kacperzalewski.schooldiary.repository.SubjectRepository;
import pl.kacperzalewski.schooldiary.repository.UserMarkRepository;

import java.security.InvalidKeyException;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserMarkService {

    private final UserMarkRepository userMarkRepository;
    private final SubjectRepository subjectRepository;
    private final MarkRepository markRepository;
    private final UserService userService;

    @Autowired
    public UserMarkService(UserMarkRepository userMarkRepository,
                           SubjectRepository subjectRepository,
                           MarkRepository markRepository,
                           UserService userService) {
        this.userMarkRepository = userMarkRepository;
        this.subjectRepository = subjectRepository;
        this.markRepository = markRepository;
        this.userService = userService;
    }

    private float getAverageFromMarks(List<UserMark> marks) {
        int weightedSum = marks.stream()
                .mapToInt(m -> m.getMark().getNumericValue().intValue() * m.getWeight())
                .sum();

        int weightSum = marks.stream()
                .mapToInt(UserMark::getWeight).sum();

        return weightSum == 0 ? 0 : (float) weightedSum / weightSum;
    }

    public Map<String, UserMarksDTO> getUserMarks(Long userId, Semester semester) throws BadCredentialsException {
        User user = userId == null ? userService.getLoggedInUser() : userService.getUserById(userId);
        List<UserMark> userMarks = userMarkRepository.findByToUserId(user.getId());
        SchoolClass userSchoolClass = user.getSchoolClass();

        if (userSchoolClass == null) {
            return Map.of();
        }

        List<Subject> subjects = userSchoolClass.getSubjectList();

        return subjects.stream()
                .collect(Collectors.toMap(
                        Subject::getName,
                        subject -> {
                            List<UserMark> subjectUserMarks = userMarks.stream().
                                    filter(m -> m.getSubject().getName().equals(subject.getName()))
                                    .toList();

                            List<UserMark> semestralUserMarks = subjectUserMarks.stream()
                                    .filter(s -> s.getSemester().equals(semester))
                                    .toList();

                            return new UserMarksDTO(
                                    getAverageFromMarks(semestralUserMarks),
                                    getAverageFromMarks(subjectUserMarks),
                                    semestralUserMarks.stream().map(UserMarkDTO::fromEntity).toList()
                            );
                        }
                ));
    }

    public void addStudentMark(MarkFormDTO markFormDTO) {
        Subject subject = subjectRepository.findByName(markFormDTO.subjectName()).orElseThrow();
        Mark mark = markRepository.findByCode(markFormDTO.markCode()).orElseThrow();

        User fromUser = userService.getLoggedInUser();
        User toUser = userService.getUserById(markFormDTO.studentId());

        UserMark markToSave = UserMark.builder()
                .title(markFormDTO.title())
                .fromUser(fromUser)
                .toUser(toUser)
                .mark(mark)
                .weight(markFormDTO.weight())
                .subject(subject)
                .semester(markFormDTO.semester())
                .date(LocalDateTime.now())
                .build();

        userMarkRepository.save(markToSave);
    }
}