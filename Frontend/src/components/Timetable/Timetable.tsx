import { Box, Chip, Container, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimetableService } from "../../services/TimetableService";
import { useAuth } from "../../context/AuthContext";
import { SchoolClassService } from "../../services/SchoolClassService";
import { SchoolClass } from "../../typings/SchoolClass";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { DayOfWeek, Timetable } from "../../typings/Timetable";
import { TIMETABLE_HOURS } from "../../constants/Timetable";

export const TimetableComponent : React.FC = () => {
    const { t } = useTranslation();
    const { accessToken, logout } = useAuth();

    const [ selectedClass, setSelectedClass ] = useState<number>(1);
    const [ schoolClasses, setSchoolClasses ] = useState<SchoolClass[] | null>(null)
    const [ timetable, setTimetable ] = useState<Timetable | null>(null);

    const getSchoolClasses = useCallback(async () => {
        try {
            const data = await SchoolClassService.GetSchoolClasses(accessToken);
            setSchoolClasses(data);
            setSelectedClass(data[0].id);
        } catch (e) {
            logout();
        }
    }, [accessToken, logout]);

    const retrieveMessages = async () => {
        try {
            const data = await TimetableService.GetTimetable(accessToken, selectedClass);
            setTimetable(data)
        } catch (e) {
            logout();
        }
    };

    const onClassChanged = (newVal: SelectChangeEvent<number>) => {
        setSelectedClass(newVal.target.value as number);
    }

    useEffect(() => {
        getSchoolClasses();
    }, [getSchoolClasses]);

    useEffect(() => {
        if (selectedClass) {
            retrieveMessages();
        }
    }, [selectedClass]);

    return (
        <Container className="pt-20" maxWidth={false} sx={{ px: { xs: 2, sm: 3, lg: 5 } }}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    {t("timetable:HEADER")}
                </Typography>

                {schoolClasses ? 
                    <Box
                        sx={{
                            display: "flex"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mr: 3
                            }}
                        >
                            <Typography
                                variant="h6"
                                color='primary'
                                sx={{
                                    display: "inline",
                                }}
                            >
                                {t("global:CLASS")}
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={selectedClass}
                                    onChange={onClassChanged}
                                >
                                    {schoolClasses.map(schoolClass => {
                                        return <MenuItem key={schoolClass.id} value={schoolClass.id}>{schoolClass.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        <TableContainer component={Paper} sx={{ margin: "auto", boxShadow: 3, mb: 10 }}>
                            <Table
                                sx={{
                                    tableLayout: "fixed",
                                    width: "100%",
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>{t('global:TIME')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:MONDAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:TUESDAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:WEDNESDAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:THURDSAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:FRIDAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:SATURDAY')}</b></TableCell>
                                        <TableCell align="center"><b>{t('global:SUNDAY')}</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timetable && Array.from({ length: 15 }).map((_, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                backgroundColor: (theme) => index % 2 === 0 ? theme.palette.background.paper : theme.palette.background.default,
                                            }}
                                        >
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    width: `${100 / 7}%`,
                                                    height: 120,
                                                    p: 0,
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                <p>{t('lesson:LESSON')} {index}</p>
                                                <b>{TIMETABLE_HOURS[index]}</b>
                                            </TableCell>
                                            {Object.values(DayOfWeek).map(day => {
                                                return <TableCell sx={{ p: 0 }} align="center">
                                                    {timetable[day] && timetable[day][index] && (
                                                        <Box
                                                            sx={{
                                                                width: "100%",
                                                                height: "100%",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                boxSizing: "border-box"
                                                            }}
                                                        >
                                                            <Chip
                                                                label={`${t('global:CLASSROOM_NUMBER')} ${timetable[day][index].room.id}`}
                                                                size="small"
                                                            />

                                                            <Typography variant="subtitle1" fontWeight="bold">
                                                                {t(`lesson:${timetable[day][index].lessonSubject}`)}
                                                            </Typography>

                                                            <Typography variant="body2" color="textSecondary">
                                                                {`${timetable[day][index].teacher.firstname} ${timetable[day][index].teacher.lastname}`}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </TableCell>
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                :
                    <LoadingCircle
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', width: '100%', }}
                        size={40}
                    />
                }
            </Container>
    );

}
