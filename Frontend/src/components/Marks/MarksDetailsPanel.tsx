import { Box, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { UserMark } from "../../typings/Mark";
import { fDateTime } from "../../utils/format-time";

type MarksDetailsPanelProps = {
    selectedUserMark: UserMark;
    onClose: () => void;
};

export const MarksDetailsPanel: React.FC<MarksDetailsPanelProps> = ({
    selectedUserMark,
    onClose,
}) => {
    const { t } = useTranslation();
    const date = fDateTime(selectedUserMark.date, "dd.MM.yyyy HH:mm");

    return (
        <Paper
            sx={{
                width: 320,
                flexShrink: 0,
                borderRadius: 2,
                boxShadow: 3,
                position: "sticky",
                top: 24,
                p: 3,
                animation: "mark-details-in 240ms ease-out",
                "@keyframes mark-details-in": {
                    "0%": { opacity: 0, transform: "translateY(8px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight={700}>
                    {t("marks:MARK_DETAILS")}
                </Typography>
                <IconButton aria-label={`${t("global:CLOSE")}`} onClick={onClose}>
                    <Close />
                </IconButton>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("global:SUBJECT")}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {t(`lesson:${selectedUserMark.subjectName}`)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("marks:MARK")}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                        {selectedUserMark.mark.symbol}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("marks:WEIGHT")}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                        {selectedUserMark.weight}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("global:ISSUER")}
                    </Typography>
                    <Typography variant="subtitle1">
                        {selectedUserMark.fromUser.firstname} {selectedUserMark.fromUser.lastname}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("global:DATE")}
                    </Typography>
                    <Typography variant="subtitle1">
                        { date }
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {t("global:TITLE")}
                    </Typography>
                    <Typography variant="subtitle1">
                        { selectedUserMark.title }
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
};
