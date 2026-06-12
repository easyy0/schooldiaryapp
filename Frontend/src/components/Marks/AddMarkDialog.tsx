import { LoadingButton } from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MarkOption, Weight } from "../../typings/Mark";
import { UserMinimized } from "../../typings/User";

type AddMarkDialogProps = {
    open: boolean;
    student: UserMinimized | null;
    subjects: string[];
    marks: MarkOption[];
    loading: boolean;
    onClose: () => void;
    onSubmit: (subjectName: string, markCode: string, title: string, semester: string, weight: number) => void;
};

export const AddMarkDialog: React.FC<AddMarkDialogProps> = ({
    open,
    student,
    subjects,
    marks,
    loading,
    onClose,
    onSubmit,
}) => {
    const { t } = useTranslation();
    const [subjectName, setSubjectName] = useState("");
    const [markCode, setMarkCode] = useState("");
    const [title, setTitle] = useState("");
    const [semester, setSemester] = useState("FIRST");
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        if (open) {
            setSubjectName(subjects[0] ?? "");
            setMarkCode(marks[0]?.code ?? "");
        }
    }, [marks, open, subjects]);

    const handleSubjectChange = (event: SelectChangeEvent) => {
        setSubjectName(event.target.value);
    };

    const handleMarkChange = (event: SelectChangeEvent) => {
        setMarkCode(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{t("marks:ADD_MARK")}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ pt: 2 }}>
                    {student && 
                        <FormControl fullWidth>
                            <TextField
                                required
                                disabled
                                name="student"
                                label={t("global:STUDENT")}
                                value={`${student.firstname} ${student.lastname}`}
                            />
                        </FormControl>
                    }

                    <FormControl fullWidth>
                        <InputLabel id="mark-subject-label">{t("global:SUBJECT")}</InputLabel>
                        <Select
                            labelId="mark-subject-label"
                            label={t("global:SUBJECT")}
                            value={subjectName}
                            onChange={handleSubjectChange}
                        >
                            {subjects.map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                    {t(`lesson:${subject}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="mark-weight-label">{t("global:WEIGHT")}</InputLabel>
                        <Select
                            labelId="mark-weight-label"
                            label={t("global:WEIGHT")}
                            value={weight.toString()}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        >
                            {Weight.map((weight) => (
                                <MenuItem key={weight} value={weight}>
                                    {weight}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="mark-value-label">{t("marks:MARK")}</InputLabel>
                        <Select
                            labelId="mark-value-label"
                            label={t("marks:MARK")}
                            value={markCode}
                            onChange={handleMarkChange}
                        >
                            {marks.map((mark) => (
                                <MenuItem key={mark.code} value={mark.code}>
                                    {mark.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="mark-semse-label">{t("global:SEMESTER")}</InputLabel>
                        <Select
                            labelId="mark-semse-label"
                            label={t("global:SEMESTER")}
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        >
                            <MenuItem value="FIRST">1</MenuItem>
                            <MenuItem value="SECOND">2</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            required
                            name="title"
                            label={t("global:TITLE")}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    {t("global:CANCEL")}
                </Button>
                <LoadingButton
                    variant="contained"
                    loading={loading}
                    disabled={!subjectName || !markCode || !title || !semester}
                    onClick={() => onSubmit(subjectName, markCode, title, semester, weight)}
                >
                    {t("global:SUBMIT")}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
