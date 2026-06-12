package pl.kacperzalewski.schooldiary;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.kacperzalewski.schooldiary.dto.MarkFormDTO;
import pl.kacperzalewski.schooldiary.dto.UserMarksDTO;
import pl.kacperzalewski.schooldiary.entity.Mark;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserMark;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;
import pl.kacperzalewski.schooldiary.repository.MarkRepository;
import pl.kacperzalewski.schooldiary.repository.SubjectRepository;
import pl.kacperzalewski.schooldiary.repository.UserMarkRepository;
import pl.kacperzalewski.schooldiary.service.UserMarkService;
import pl.kacperzalewski.schooldiary.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserMarkServiceTest {

    @Mock
    private UserMarkRepository userMarkRepository;

    @Mock
    private MarkRepository markRepository;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private UserService userService;

    private UserMarkService userMarkService;

    @BeforeEach
    void setUp() {
        userMarkService = new UserMarkService(
                userMarkRepository,
                subjectRepository,
                markRepository,
                userService
        );
    }

    @Test
    void shouldCalculateWeightedAverageForSubjectMarks() {
        Subject math = Subject.builder()
                .name("MATH")
                .build();

        SchoolClass schoolClass = SchoolClass.builder()
                .id(1L)
                .subjectList(List.of(math))
                .build();

        User student = User.builder()
                .id(1L)
                .schoolClass(schoolClass)
                .build();

        List<UserMark> marks = List.of(
                createUserMark(math, Semester.FIRST, 5, 3),
                createUserMark(math, Semester.FIRST, 3, 1)
        );

        when(userService.getUserById(1L)).thenReturn(student);
        when(userMarkRepository.findByToUserId(1L)).thenReturn(marks);

        Map<String, UserMarksDTO> result = userMarkService.getUserMarks(1L, Semester.FIRST);

        UserMarksDTO mathMarks = result.get("MATH");
        assertEquals(4.5f, mathMarks.semestralAverage());
        assertEquals(4.5f, mathMarks.annualAverage());
        assertEquals(2, mathMarks.marks().size());
    }

    @Test
    void shouldReturnOnlyFirstSemesterMarks() {
        Subject math = Subject.builder()
                .name("MATH")
                .build();

        SchoolClass schoolClass = SchoolClass.builder()
                .id(1L)
                .subjectList(List.of(math))
                .build();

        User student = User.builder()
                .id(1L)
                .schoolClass(schoolClass)
                .build();

        List<UserMark> marks = List.of(
                createUserMark(math, Semester.SECOND, 5, 3),
                createUserMark(math, Semester.FIRST, 3, 1),
                createUserMark(math, Semester.FIRST, 3, 2),
                createUserMark(math, Semester.FIRST, 1, 3),
                createUserMark(math, Semester.SECOND, 3, 4),
                createUserMark(math, Semester.FIRST, 5, 4),
                createUserMark(math, Semester.SECOND, 1, 2),
                createUserMark(math, Semester.FIRST, 3, 1)
        );

        when(userService.getUserById(1L)).thenReturn(student);
        when(userMarkRepository.findByToUserId(1L)).thenReturn(marks);

        Map<String, UserMarksDTO> result = userMarkService.getUserMarks(1L, Semester.FIRST);

        UserMarksDTO mathMarks = result.get("MATH");
        assertEquals(5, mathMarks.marks().size());
    }

    @Test
    void shouldCalculateAnnualAverageFromAllSemesters() {
        Subject math = Subject.builder()
                .name("MATH")
                .build();

        SchoolClass schoolClass = SchoolClass.builder()
                .id(1L)
                .subjectList(List.of(math))
                .build();

        User student = User.builder()
                .id(1L)
                .schoolClass(schoolClass)
                .build();

        List<UserMark> marks = List.of(
                createUserMark(math, Semester.SECOND, 5, 3),
                createUserMark(math, Semester.FIRST, 3, 1),
                createUserMark(math, Semester.FIRST, 3, 2),
                createUserMark(math, Semester.FIRST, 1, 3),
                createUserMark(math, Semester.SECOND, 3, 4),
                createUserMark(math, Semester.FIRST, 5, 4),
                createUserMark(math, Semester.SECOND, 1, 2),
                createUserMark(math, Semester.FIRST, 3, 1)
        );

        when(userService.getUserById(1L)).thenReturn(student);
        when(userMarkRepository.findByToUserId(1L)).thenReturn(marks);

        Map<String, UserMarksDTO> result = userMarkService.getUserMarks(1L, Semester.FIRST);

        UserMarksDTO mathMarks = result.get("MATH");
        assertEquals(3.2f, mathMarks.annualAverage());
    }

    @Test
    void shouldSaveStudentMark() {
        Subject math = Subject.builder()
                .name("MATH")
                .build();

        Mark mark = Mark.builder()
                .code("ONE_PLUS")
                .symbol("1+")
                .numericValue(BigDecimal.valueOf(1.5))
                .build();

        User teacher = User.builder()
                .id(2L)
                .build();

        User student = User.builder()
                .id(1L)
                .build();

        MarkFormDTO markFormDTO = new MarkFormDTO(
                1L,
                "MATH",
                "ONE_PLUS",
                "Test mark",
                1,
                Semester.FIRST
        );

        when(subjectRepository.findByName("MATH")).thenReturn(Optional.of(math));
        when(markRepository.findByCode("ONE_PLUS")).thenReturn(Optional.of(mark));
        when(userService.getLoggedInUser()).thenReturn(teacher);
        when(userService.getUserById(1L)).thenReturn(student);

        userMarkService.addStudentMark(markFormDTO);

        ArgumentCaptor<UserMark> userMarkCaptor = ArgumentCaptor.forClass(UserMark.class);
        verify(userMarkRepository).save(userMarkCaptor.capture());

        UserMark savedUserMark = userMarkCaptor.getValue();

        assertEquals("Test mark", savedUserMark.getTitle());
        assertSame(teacher, savedUserMark.getFromUser());
        assertSame(student, savedUserMark.getToUser());
        assertSame(math, savedUserMark.getSubject());
        assertSame(mark, savedUserMark.getMark());
        assertEquals(1, savedUserMark.getWeight());
        assertEquals(Semester.FIRST, savedUserMark.getSemester());
        assertNotNull(savedUserMark.getDate());
    }

    private UserMark createUserMark(Subject subject, Semester semester, int numericValue, int weight) {
        return UserMark.builder()
                .title("Test mark")
                .fromUser(User.builder().id(2L).build())
                .subject(subject)
                .semester(semester)
                .mark(Mark.builder()
                        .code(String.valueOf(numericValue))
                        .symbol(String.valueOf(numericValue))
                        .numericValue(BigDecimal.valueOf(numericValue))
                        .build())
                .weight(weight)
                .date(LocalDateTime.now())
                .build();
    }
}
