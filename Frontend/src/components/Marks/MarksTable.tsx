import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserMark } from "../../typings/Mark";
import { MarksBySubject } from "../../typings/Mark";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { MarksAverage } from "./MarksAverage";
import { MarksMark } from "./MarksMark";

type MarksTableProps = {
    userMarksMap: MarksBySubject | null | undefined;
    selectedUserMark: UserMark | null;
    onMarkSelected: (userMark: UserMark) => void;
    emptyMessage?: string;
};

export const MarksTable: React.FC<MarksTableProps> = ({
    userMarksMap,
    selectedUserMark,
    onMarkSelected,
    emptyMessage,
}) => {
    const { t } = useTranslation();
    const marksEntries = userMarksMap ? Object.entries(userMarksMap) : [];

    return (
        <TableContainer
            component={Paper}
            sx={{ margin: "auto", boxShadow: 3, mb: 10, borderRadius: 2 }}
        >
            <Table sx={{ width: "100%", tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: "background.default",
                            "& .MuiTableCell-root": {
                                fontWeight: 700,
                                color: "text.secondary",
                                letterSpacing: "0.04em",
                            },
                        }}
                    >
                        <TableCell align="center" sx={{ width: "28%" }}>{t("global:SUBJECT")}</TableCell>
                        <TableCell align="center" sx={{ width: "46%" }}>{t("marks:MARKS")}</TableCell>
                        <TableCell align="center" sx={{ width: "13%" }}>{t("marks:SEMESTRAL_AVERAGE")}</TableCell>
                        <TableCell align="center" sx={{ width: "13%" }}>{t("marks:YEARLY_AVERAGE")}</TableCell>
                    </TableRow>
                </TableHead>
                {userMarksMap ? (
                    <TableBody>
                        {marksEntries.length > 0 ? (
                            marksEntries.map(([lessonName, userMarks]) => (
                                <TableRow
                                    key={lessonName}
                                    sx={{
                                        "&:nth-of-type(odd)": {
                                            bgcolor: "action.selected",
                                        },
                                        "& .MuiTableCell-root": {
                                            borderBottomColor: "divider",
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight={600} align="center">
                                            {t(`lesson:${lessonName}`)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            spacing={0.5}
                                            justifyContent="center"
                                            alignItems="center"
                                            useFlexGap
                                            flexWrap="wrap"
                                        >
                                            {userMarks.marks.map((userMark: UserMark, index: number) => (
                                                <MarksMark
                                                    key={`${userMark.id}-${index}`}
                                                    value={userMark.mark.symbol}
                                                    weight={userMark.weight}
                                                    selected={selectedUserMark?.id === userMark.id}
                                                    onButtonSelected={() => onMarkSelected(userMark)}
                                                />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <MarksAverage average={userMarks.semestralAverage} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <MarksAverage average={userMarks.annualAverage} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">{emptyMessage}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box
                                    sx={{
                                        minHeight: 125,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <LoadingCircle size={30} />
                                    <Typography>{t("marks:LOADING_MARKS")}</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};
