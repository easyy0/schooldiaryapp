import {
    Add,
    School,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MarksService } from "../../services/MarksService";
import { SchoolClassService } from "../../services/SchoolClassService";
import { SchoolClass } from "../../typings/SchoolClass";
import { MarkFormDTO, MarkOption, MarksBySubject, UserMark } from "../../typings/Mark";
import { UserMinimized } from "../../typings/User";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { AddMarkDialog } from "./AddMarkDialog";
import { MarksDetailsPanel } from "./MarksDetailsPanel";
import { MarksTable } from "./MarksTable";
import { useTranslation } from "react-i18next";

const DEFAULT_MARKS: MarkOption[] = [
    { code: "ONE_MINUS", symbol: "1-" },
    { code: "ONE", symbol: "1" },
    { code: "ONE_PLUS", symbol: "1+" },
    { code: "TWO_MINUS", symbol: "2-" },
    { code: "TWO", symbol: "2" },
    { code: "TWO_PLUS", symbol: "2+" },
    { code: "THREE_MINUS", symbol: "3-" },
    { code: "THREE", symbol: "3" },
    { code: "THREE_PLUS", symbol: "3+" },
    { code: "FOUR_MINUS", symbol: "4-" },
    { code: "FOUR", symbol: "4" },
    { code: "FOUR_PLUS", symbol: "4+" },
    { code: "FIVE_MINUS", symbol: "5-" },
    { code: "FIVE", symbol: "5" },
    { code: "FIVE_PLUS", symbol: "5+" },
    { code: "SIX_MINUS", symbol: "6-" },
    { code: "SIX", symbol: "6" },
    { code: "SIX_PLUS", symbol: "6+" },
];

export const MarksTeacherView: React.FC<{ semester: number }> = ({ semester }) => {
    const { t } = useTranslation();
    const { accessToken, logout } = useAuth();
    const [schoolClasses, setSchoolClasses] = useState<SchoolClass[] | null>(null);
    const [students, setStudents] = useState<UserMinimized[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | "">("");
    const [selectedStudentId, setSelectedStudentId] = useState<number | "">("");
    const [studentMarks, setStudentMarks] = useState<MarksBySubject | null>();
    const [selectedUserMark, setSelectedUserMark] = useState<UserMark | null>(null);
    const [addMarkOpen, setAddMarkOpen] = useState(false);
    const [savingMark, setSavingMark] = useState(false);

    const selectedStudent = useMemo(
        () => students.find((student) => student.id === selectedStudentId) ?? null,
        [selectedStudentId, students],
    );

    const getSchoolClasses = useCallback(async () => {
        try {
            const data = await SchoolClassService.GetSchoolClasses(accessToken);
            setSchoolClasses(data);
            setSelectedClassId(data[0]?.id ?? "");
        } catch (e) {
            logout();
        }
    }, [accessToken, logout]);

    const getStudents = useCallback(async () => {
        if (!selectedClassId) {
            return;
        }

        try {
            const data = await SchoolClassService.GetClassStudents(accessToken, selectedClassId);
            setStudents(data);
            setSelectedStudentId(data[0]?.id ?? "");
            setSelectedUserMark(null);
        } catch (e) {
            logout();
        }
    }, [accessToken, logout, selectedClassId]);

    const getSubjects = useCallback(async () => {
        if (!selectedClassId) {
            return;
        }

        try {
            const data = await SchoolClassService.GetClassSubjects(accessToken, selectedClassId);
            setSubjects(data);
        } catch (e) {
            setSubjects([]);
        }
    }, [accessToken, selectedClassId]);

    const getStudentMarks = useCallback(async () => {
        if (!selectedStudentId) {
            setStudentMarks({});
            return;
        }

        try {
            setStudentMarks(null);
            const data = await MarksService.GetMarks(accessToken, selectedStudentId, semester === 1 ? "FIRST" : "SECOND");
            setStudentMarks(data);
        } catch (e) {
            logout();
        }
    }, [accessToken, logout, selectedStudentId, semester]);

    useEffect(() => {
        getSchoolClasses();
    }, [getSchoolClasses]);

    useEffect(() => {
        getStudents();
        getSubjects();
    }, [getStudents, getSubjects]);

    useEffect(() => {
        getStudentMarks();
    }, [getStudentMarks]);

    const handleClassChange = (event: SelectChangeEvent<number | "">) => {
        setSelectedClassId(event.target.value as number);
        setSelectedStudentId("");
        setStudentMarks(undefined);
    };

    const handleStudentChange = (event: SelectChangeEvent<number | "">) => {
        setSelectedStudentId(event.target.value as number);
        setSelectedUserMark(null);
    };

    const handleSubmitMark = async (subjectName: string, markCode: string, title: string, semester: string, weight: number) => {
        if (!selectedStudentId) {
            return;
        }
        
        const markFormDTO: MarkFormDTO = {
            studentId: selectedStudentId,
            subjectName,
            markCode,
            title,
            semester,
            weight
        };

        try {
            setSavingMark(true);
            await MarksService.AddStudentMark(accessToken, markFormDTO);
            
            setAddMarkOpen(false);
            await getStudentMarks();
        } catch (e) {
            logout();
        } finally {
            setSavingMark(false);
        }
    };

    if (!schoolClasses) {
        return (
            <LoadingCircle
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 260, width: "100%" }}
                size={40}
            />
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", lg: "320px minmax(0, 1fr)" },
                    gap: 3,
                    alignItems: "flex-start",
                }}
            >
                <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 3 }}>
                    <Stack spacing={3}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <School color="primary" />
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    {t("marks:MARKS_PREVIEW")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t("marks:SELECT_CLASS_AND_STUDENT")}
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider />

                        <FormControl fullWidth>
                            <InputLabel id="teacher-class-label">{t("global:CLASS")}</InputLabel>
                            <Select
                                labelId="teacher-class-label"
                                label="Klasa"
                                value={selectedClassId}
                                onChange={handleClassChange}
                            >
                                {schoolClasses.map((schoolClass) => (
                                    <MenuItem key={schoolClass.id} value={schoolClass.id}>
                                        {schoolClass.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth disabled={!students.length}>
                            <InputLabel id="teacher-student-label">{t("global:STUDENT")}</InputLabel>
                            <Select
                                labelId="teacher-student-label"
                                label={t("global:STUDENT")}
                                value={selectedStudentId}
                                onChange={handleStudentChange}
                            >
                                {students.map((student) => (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.firstname} {student.lastname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            disabled={!selectedStudent || subjects.length === 0}
                            onClick={() => setAddMarkOpen(true)}
                            fullWidth
                        >
                            {t("marks:ADD_MARK")}
                        </Button>
                    </Stack>
                </Paper>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 3,
                        minWidth: 0,
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Paper
                            sx={{
                                borderRadius: 2,
                                boxShadow: 3,
                                p: 3,
                                mb: 3,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    {selectedStudent
                                        ? `${selectedStudent.firstname} ${selectedStudent.lastname}`
                                        : t("marks:CHOOSE_STUDENT_FROM_LIST")}
                                </Typography>
                            </Box>
                        </Paper>

                        <MarksTable
                            userMarksMap={studentMarks}
                            selectedUserMark={selectedUserMark}
                            onMarkSelected={setSelectedUserMark}
                            emptyMessage={selectedStudent ? t("marks:STUDENT_HAS_NO_MARKS") : t("marks:CHOOSE_STUDENT_FROM_LIST")}
                        />
                    </Box>

                    {selectedUserMark && (
                        <MarksDetailsPanel
                            selectedUserMark={selectedUserMark}
                            onClose={() => setSelectedUserMark(null)}
                        />
                    )}
                </Box>
            </Box>

            <AddMarkDialog
                open={addMarkOpen}
                student={selectedStudent}
                subjects={subjects}
                marks={DEFAULT_MARKS}
                loading={savingMark}
                onClose={() => setAddMarkOpen(false)}
                onSubmit={handleSubmitMark}
            />
        </>
    );
};
