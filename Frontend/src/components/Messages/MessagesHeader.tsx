import { Add } from "@mui/icons-material"
import { Stack, Typography, Button } from "@mui/material"
import { useTranslation } from "react-i18next";

interface MessagesHeaderProps {
    setIsWritingMessage: (toggle: boolean) => void
}

export const MessagesHeader : React.FC<MessagesHeaderProps> = ({
    setIsWritingMessage
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">{t("messages:MESSAGES")}</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Add />}
                    onClick={() => setIsWritingMessage(true)}
                >
                    {t("messages:NEW_MESSAGE")}
                </Button>
            </Stack>
        </>
    )
}