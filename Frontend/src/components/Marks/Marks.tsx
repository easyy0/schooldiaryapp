import { Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAccount } from "../../context/AccountContext";
import { StyledSwitch } from "../StyledSwitch/StyledSwitch";
import { MarksStudentView } from "./MarksStudentView";
import { MarksTeacherView } from "./MarksTeacherView";
import { useState } from "react";

export const MarksComponent: React.FC = () => {
    const { t } = useTranslation();
    const { account } = useAccount();
    const isTeacher = account?.role?.includes("TEACHER");
    const [semester, setSemester] = useState(1);

    return (
        <Container className="pt-20" maxWidth={false} sx={{ px: { xs: 2, sm: 3, lg: 5 } }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">
                    {t("marks:MARKS")}
                </Typography>

                <StyledSwitch semester={semester} setSemester={setSemester} />
            </Stack>

            {isTeacher ? <MarksTeacherView semester={semester} /> : <MarksStudentView semester={semester} />}
        </Container>
    );
};
